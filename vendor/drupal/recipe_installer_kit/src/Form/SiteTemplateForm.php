<?php

namespace Drupal\RecipeKit\Installer\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Recipe\Recipe;
use Drupal\Core\Recipe\RecipeFileException;
use Drupal\RecipeKit\Installer\FormInterface as InstallerFormInterface;
use Drupal\RecipeKit\Installer\Hooks;
use Symfony\Component\Finder\Finder;

/**
 * Provides a form to choose a site template.
 */
final class SiteTemplateForm extends FormBase implements InstallerFormInterface {

  /**
   * {@inheritdoc}
   */
  public static function toInstallTask(array $install_state): array {
    // Skip this form if optional recipes have already been chosen.
    if (array_key_exists('recipes', $install_state['parameters'])) {
      $run = INSTALL_TASK_SKIP;
    }
    return [
      'display_name' => t('Choose site template'),
      'type' => 'form',
      'run' => $run ?? INSTALL_TASK_RUN_IF_REACHED,
      'function' => static::class,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'installer_site_template_form';
  }

  private function getAvailableSiteTemplates(): iterable {
    $dir = Hooks::getRecipePath();

    $finder = Finder::create()->in($dir)->files()->name('recipe.yml');
    foreach ($finder as $file) {
      try {
        $recipe = Recipe::createFromDirectory($file->getPath());
        if ($recipe->type === 'Site') {
          yield $recipe;
        }
      }
      catch (RecipeFileException) {
        // The recipe file isn't valid, so ignore it.
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, ?array $install_state = NULL): array {
    $form['template'] = [
      '#type' => 'radios',
      // @todo Make this non-required, with some way to choose a default.
      '#required' => TRUE,
      '#required_error' => $this->t('You must choose a site template.'),
    ];
    foreach ($this->getAvailableSiteTemplates() as $recipe) {
      // @todo Make this work with recipes that don't have the `drupal/`
      // vendor prefix.
      $name = 'drupal/' . basename($recipe->path);
      $form['template']['#options'][$name] = $recipe->name;
    }
    // If installing non-interactively (i.e., `drush site:install`), default to
    // the first available template.
    if (empty($install_state['interactive'])) {
      $form['template']['#default_value'] = key($form['template']['#options']);
    }

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

    $pressed_button = $form_state->getTriggeringElement();
    // Only choose the template if the Next button was pressed, or if the form
    // was submitted programmatically (i.e., by `drush site:install`).
    if (($pressed_button && $pressed_button['#op'] === 'submit') || $form_state->isProgrammed()) {
      $install_state['parameters']['recipes'] = [
        $form_state->getValue('template'),
      ];
    }
  }

}
