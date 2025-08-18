<?php

namespace Drupal\modeler_api\Controller;

use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\MessageCommand;
use Drupal\Core\Ajax\RedirectCommand;
use Drupal\Core\Config\Entity\ConfigEntityInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\modeler_api\Api;
use Drupal\modeler_api\EntityOriginalTrait;
use Drupal\modeler_api\Form\Settings;
use Drupal\modeler_api\Plugin\ModelerPluginManager;
use Drupal\modeler_api\Plugin\ModelOwnerPluginManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Provides endpoints for all the modeler API routes.
 *
 * @package Drupal\modeler_api\Controller
 */
final class ModelerApi extends ControllerBase {

  use EntityOriginalTrait;

  /**
   * Modeler API controller constructor.
   */
  public function __construct(
    protected Request $request,
    protected ModelOwnerPluginManager $modelOwnerPluginManager,
    protected ModelerPluginManager $modelerPluginManager,
    protected Api $api,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): ModelerApi {
    return new ModelerApi(
      $container->get('request_stack')->getCurrentRequest(),
      $container->get('plugin.manager.modeler_api.model_owner'),
      $container->get('plugin.manager.modeler_api.modeler'),
      $container->get('modeler_api.service'),
    );
  }

  /**
   * Displays add new model links for available modelers or opens a modeler.
   *
   * If modeler id is provided, the modeler will provide its edit form.
   * Otherwise, all available modelers will be collected and a select list will
   * be provided. If only 1 modeler is available, then a redirect to the route
   * "modeler_api.add.[ownerId].[modelerId]" will bring the request back
   * to this method by providing both arguments.
   *
   * @param string $ownerId
   *   The model owner plugin id.
   * @param string|null $modelerId
   *   The modeler plugin id, or NULL if a modeler should be selected first.
   *
   * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
   *   A render array for a list of modelers that can add new models; however,
   *   if there is only one modeler available, the function will return a
   *   RedirectResponse to directly add that model type.
   */
  public function add(string $ownerId, ?string $modelerId = NULL): array|RedirectResponse {
    if ($modelerId !== NULL) {
      try {
        /** @var \Drupal\modeler_api\Plugin\ModelerApiModelOwner\ModelOwnerInterface $owner */
        $owner = $this->modelOwnerPluginManager->createInstance($ownerId);
        /** @var \Drupal\modeler_api\Plugin\ModelerApiModeler\ModelerInterface $modeler */
        $modeler = $this->modelerPluginManager->createInstance($modelerId);
      }
      catch (PluginException) {
        // Can't create the modeler, we can't deal with this.
        return [];
      }
      /** @var \Drupal\Core\Config\Entity\ConfigEntityInterface $model */
      $model = $this->entityTypeManager()->getStorage($owner->configEntityTypeId())->create([]);
      $id = '';
      $owner->setModelData($model, $modeler->prepareEmptyModelData($id));
      $model->set('id', $id);
      $build = $this->api->edit($model, $modelerId);
      $build['#title'] = $this->t('Create new :type model', [':type' => $owner->label()]);
      return $build;
    }
    $modelers = [];
    foreach ($this->modelerPluginManager->getAllInstances() as $id => $modeler) {
      $definition = $modeler->getPluginDefinition();
      if ($modeler->isEditable()) {
        $url = Url::fromRoute('modeler_api.add.' . $ownerId . '.' . $id);
        if ($url->access()) {
          $label = $definition['label'] ?? $id;
          $description = $definition['description'] ?? 'Use ' . $label . ' to create the new model.';
          $modelers[$id] = [
            'id' => $id,
            'provider' => $definition['provider'],
            'label' => $label,
            'description' => $description,
            'add_link' => Link::fromTextAndUrl($label, $url),
          ];
        }
      }
    }
    if (count($modelers) === 1) {
      $modeler = array_shift($modelers);
      return $this->redirect('modeler_api.add.' . $ownerId . '.' . $modeler['id']);
    }
    return [
      '#cache' => [
        'tags' => [
          'modeler_api_plugins',
        ],
      ],
      '#title' => $this->t('Available modelers'),
      '#theme' => 'entity_add_list',
      '#bundles' => $modelers,
      '#add_bundle_message' => $this->t('There are no modelers available yet. Install at least one module that provides a modeler. A list of available integrations can be found on the <a href=":url" target="_blank" rel="nofollow noreferrer">Modeler API project page</a>.', [
        ':url' => 'https://www.drupal.org/project/modeler_api#modelers',
      ]),
    ];
  }

  /**
   * Enable the given entity if disabled.
   *
   * @param \Drupal\Core\Config\Entity\ConfigEntityInterface $model
   *   The config entity.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   Redirect response to go to the collection page.
   */
  public function enable(ConfigEntityInterface $model): RedirectResponse {
    $owner = $this->api->findOwner($model);
    if (!$model->status()) {
      $owner->enable($model);
    }
    return $this->redirect('entity.' . $owner->configEntityTypeId() . '.collection');
  }

  /**
   * Disable the given entity if enabled.
   *
   * @param \Drupal\Core\Config\Entity\ConfigEntityInterface $model
   *   The config entity.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   Redirect response to go to the collection page.
   */
  public function disable(ConfigEntityInterface $model): RedirectResponse {
    $owner = $this->api->findOwner($model);
    if ($model->status()) {
      $owner->disable($model);
    }
    return $this->redirect('entity.' . $owner->configEntityTypeId() . '.collection');
  }

  /**
   * Clone the given entity and save it as a new one.
   *
   * @param \Drupal\Core\Config\Entity\ConfigEntityInterface $model
   *   The config entity.
   *
   * @return \Symfony\Component\HttpFoundation\RedirectResponse
   *   Redirect response to go to the collection page.
   */
  public function clone(ConfigEntityInterface $model): RedirectResponse {
    $owner = $this->api->findOwner($model);
    if ($owner->isEditable($model)) {
      $owner->clone($model);
    }
    return $this->redirect('entity.' . $owner->configEntityTypeId() . '.collection');
  }

  /**
   * Export the model from the given entity.
   *
   * @param \Drupal\Core\Config\Entity\ConfigEntityInterface $model
   *   The config entity.
   *
   * @return \Symfony\Component\HttpFoundation\Response
   *   Redirect response to go to the collection page.
   */
  public function export(ConfigEntityInterface $model): Response {
    $owner = $this->api->findOwner($model);
    return $owner->export($model);
  }

  /**
   * Edit the given entity if the modeler supports that.
   *
   * @param \Drupal\Core\Config\Entity\ConfigEntityInterface $model
   *   The config entity.
   * @param string|null $modelerId
   *   The optional ID of the modeler that should be used for editing.
   *
   * @return array
   *   The render array for editing the entity.
   */
  public function edit(ConfigEntityInterface $model, ?string $modelerId = NULL): array {
    return $this->api->edit($model, $modelerId);
  }

  /**
   * View the given entity if the modeler supports that.
   *
   * @param \Drupal\Core\Config\Entity\ConfigEntityInterface $model
   *   The config entity.
   * @param string|null $modelerId
   *   The optional ID of the modeler that should be used for viewing.
   *
   * @return array
   *   The render array for viewing the entity.
   */
  public function view(ConfigEntityInterface $model, ?string $modelerId = NULL): array {
    return $this->api->view($model, $modelerId);
  }

  /**
   * Ajax callback to save an model with a given modeler.
   *
   * @param string $model_owner_id
   *   The plugin ID of the model owner.
   * @param string $modeler_id
   *   The plugin ID of the modeler that's being used for the posted model.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   An Ajax response object containing the message indicating the success of
   *   the save operation and if this is a new entity to be saved, also
   *   containing a redirect instruction to the edit page of that entity.
   */
  public function save(string $model_owner_id, string $modeler_id): AjaxResponse {
    $response = new AjaxResponse();
    try {
      $isNew = $this->request->headers->get('X-Modeler-API-isNew', 'false') === 'true';
      $data = $this->request->getContent();
      $model = $this->api->prepareModelFromData($data, $model_owner_id, $modeler_id, $isNew);
      if ($model !== NULL) {
        $isNew = $model->isNew();
        $originalModel = $this->getOriginal($model);
        $model->save();
        if ($isNew) {
          /** @var \Drupal\modeler_api\Plugin\ModelerApiModelOwner\ModelOwnerInterface $owner */
          $owner = $this->modelOwnerPluginManager->createInstance($model_owner_id);
          if ($owner->storageMethod($model) !== Settings::STORAGE_OPTION_THIRD_PARTY) {
            // Save the new entity once again to allow for proper handling of
            // the storage method.
            // @see https://www.drupal.org/project/modeler_api/issues/3535238
            $owner->setModelData($model, $data);
            $model->save();
          }
        }
        if ($isNew || ($model->label() !== $originalModel?->label())) {
          /** @var \Drupal\modeler_api\Plugin\ModelerApiModelOwner\ModelOwnerInterface $owner */
          $owner = $this->modelOwnerPluginManager->createInstance($model_owner_id);
          $type = $owner->configEntityTypeId();
          foreach ([
            'entity.' . $type . '.edit',
            'entity.' . $type . '.edit_form',
          ] as $routeName) {
            if ($this->api->getRouteByName($routeName)) {
              break;
            }
          }
          $editUrl = Url::fromRoute($routeName, [$type => $model->id()], ['absolute' => TRUE])->toString();
          $response->addCommand(new RedirectCommand($editUrl));
        }
        $message = new MessageCommand('Successfully saved the model.', NULL, [
          'type' => 'status',
        ]);
      }
      else {
        $message = new MessageCommand('Model contains error(s) and can not be saved.', NULL, [
          'type' => 'error',
        ]);
        foreach ($this->api->getErrors() as $error) {
          $message = new MessageCommand($error, NULL, [
            'type' => 'error',
          ]);
        }
      }
    }
    catch (PluginException $e1) {
      $message = new MessageCommand('Problem with a plugin: ' . $e1->getMessage(), NULL, [
        'type' => 'error',
      ]);
    }
    catch (\Exception $e2) {
      // @todo Log details about the exception.
      $message = new MessageCommand($e2->getMessage(), NULL, [
        'type' => 'error',
      ]);
    }
    $response->addCommand($message);
    foreach ($this->messenger()->all() as $type => $messages) {
      foreach ($messages as $message) {
        $response->addCommand(new MessageCommand($message, NULL, ['type' => $type], FALSE));
      }
    }
    $this->messenger()->deleteAll();
    return $response;
  }

  /**
   * Ajax callback to receive the config form for a component.
   *
   * @param string $model_owner_id
   *   The plugin ID of the model owner.
   * @param string $modeler_id
   *   The plugin ID of the modeler that's being used for the posted model.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   An Ajax response object containing the config form.
   */
  public function configForm(string $model_owner_id, string $modeler_id): AjaxResponse {
    /** @var \Drupal\modeler_api\Plugin\ModelerApiModelOwner\ModelOwnerInterface $owner */
    $owner = $this->modelOwnerPluginManager->createInstance($model_owner_id);
    /** @var \Drupal\modeler_api\Plugin\ModelerApiModeler\ModelerInterface $modeler */
    $modeler = $this->modelerPluginManager->createInstance($modeler_id);
    return $modeler->configForm($owner);
  }

}
