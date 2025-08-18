<?php

namespace Drupal\modeler_api\Plugin\Derivative;

use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\modeler_api\Api;
use Drupal\modeler_api\Plugin\ModelOwnerPluginManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides menu link definitions for all model owners.
 */
class ModelerApiMenuLink extends DeriverBase implements ContainerDeriverInterface {

  use StringTranslationTrait;

  /**
   * Constructs a ModelerApiLocalAction object.
   */
  final public function __construct(
    protected ModelOwnerPluginManager $modelOwnerPluginManager,
    protected Api $modelerApiService,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, $base_plugin_id): ModelerApiMenuLink {
    return new static(
      $container->get('plugin.manager.modeler_api.model_owner'),
      $container->get('modeler_api.service'),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition): array {
    $this->derivatives = [];
    foreach ($this->modelOwnerPluginManager->getAllInstances() as $owner) {
      $basePath = $owner->configEntityBasePath();
      if ($basePath === NULL) {
        continue;
      }
      $type = $owner->configEntityTypeId();
      $this->derivatives['entity.' . $type . '.collection'] = [
        'title' => $owner->label(),
        'parent' => $this->modelerApiService->getParentMenuName($owner->configEntityBasePath()) ?? 'system.admin_config_workflow',
        'description' => $owner->description(),
        'route_name' => 'entity.' . $type . '.collection',
      ];
      $name = 'entity.' . $type . '.import';
      if ($this->modelerApiService->getRouteByName($name)) {
        $this->derivatives[$name] = [
          'title' => $this->t('Import'),
          'parent' => 'entity.' . $type . '.collection',
          'description' => $this->t('Import a model'),
          'route_name' => $name,
        ];
      }
      $this->derivatives['entity.' . $type . '.settings'] = [
        'title' => $this->t('Settings'),
        'parent' => 'entity.' . $type . '.collection',
        'description' => $this->t('Configure the model'),
        'route_name' => 'entity.' . $type . '.settings',
      ];
    }
    foreach ($this->derivatives as &$entry) {
      $entry += $base_plugin_definition;
    }
    return $this->derivatives;
  }

}
