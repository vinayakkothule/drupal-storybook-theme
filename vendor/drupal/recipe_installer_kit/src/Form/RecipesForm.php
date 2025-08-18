<?php

namespace Drupal\RecipeKit\Installer\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element\Checkboxes;
use Drupal\RecipeKit\Installer\FormInterface as InstallerFormInterface;

/**
 * Provides a form to choose optional add-on recipes.
 */
final class RecipesForm extends FormBase implements InstallerFormInterface {

  /**
   * {@inheritdoc}
   */
  public static function toInstallTask(array $install_state): array {
    // Skip this form if optional recipes have already been chosen, or if the
    // profile doesn't define any optional recipe groups.
    if (array_key_exists('recipes', $install_state['parameters']) || empty($install_state['profile_info']['recipes']['optional'])) {
      $run = INSTALL_TASK_SKIP;
    }
    return [
      'display_name' => t('Choose add-ons'),
      'type' => 'form',
      'run' => $run ?? INSTALL_TASK_RUN_IF_REACHED,
      'function' => static::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'installer_recipes_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, ?array $install_state = NULL): array {
    assert(is_array($install_state));

    $flavors = self::getFlavors($install_state);
    $form['add_ons'] = [
      '#type' => 'checkboxes',
      '#value_callback' => static::class . '::valueCallback',
      '#options' => array_combine(array_keys($flavors), array_column($flavors, 'name')),
    ];
    $form['actions'] = [
      'submit' => [
        '#type' => 'submit',
        '#value' => $this->t('Next'),
        '#button_type' => 'primary',
        '#op' => 'submit',
      ],
      'skip' => [
        '#type' => 'submit',
        '#value' => $this->t('Skip this step'),
        '#op' => 'skip',
      ],
      '#type' => 'actions',
    ];
    $form['#title'] = '';
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    global $install_state;
    $list = [];
    $flavors = self::getFlavors($install_state);

    $pressed_button = $form_state->getTriggeringElement();
    // Only choose add-ons if the Next button was pressed, or if the form was
    // submitted programmatically (i.e., by `drush site:install`).
    if (($pressed_button && $pressed_button['#op'] === 'submit') || $form_state->isProgrammed()) {
      $chosen_flavors = $form_state->getValue('add_ons', []);
      $chosen_flavors = array_filter($chosen_flavors);
      foreach ($chosen_flavors as $key) {
        $list = array_merge($list, $flavors[$key]['packages']);
      }
    }
    // A NULL parameter will simply be encoded into the URL query string like
    // `?site_name=Foo&recipes`, which will satisfy the `array_key_exists()`
    // check in ::toInstallTask() when the query string is decoded.
    // @see \Drupal\Component\Utility\UrlHelper::buildQuery()
    $install_state['parameters']['recipes'] = $list ? array_unique($list) : NULL;
  }

  public static function valueCallback(&$element, $input, FormStateInterface $form_state): array {
    // If the input was a pipe-separated string or `*`, transform it -- this is
    // for compatibility with `drush site:install`.
    if (is_string($input)) {
      $selections = $input === '*'
        ? array_keys($element['#options'])
        : array_map('trim', explode('|', $input));

      $input = array_combine($selections, $selections);
    }
    return Checkboxes::valueCallback($element, $input, $form_state);
  }

  private static function getFlavors(array $install_state): array {
    $flavors = [];

    foreach ($install_state['profile_info']['recipes']['optional'] ?? [] as $key => $value) {
      // For backwards compatibility, each flavor can either be a flat array of
      // package names (in which case the key is the human-readable name), or
      // it can be an associative array with `name` and `packages` elements (the
      // best practice).
      if (array_is_list($value)) {
        $value = ['name' => $key, 'packages' => $value];
      }
      // Allow the name to be a translatable string, which won't happen unless
      // we pass it through the translation system.
      $value['name'] = t($value['name']);
      $flavors[$key] = $value;
    }
    return $flavors;
  }

}
