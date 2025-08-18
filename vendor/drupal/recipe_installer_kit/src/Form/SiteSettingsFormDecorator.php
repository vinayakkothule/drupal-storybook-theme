<?php

declare(strict_types=1);

namespace Drupal\RecipeKit\Installer\Form;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Form\FormInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Installer\Form\SiteSettingsForm;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Decorates the installer's database settings form.
 *
 * We cannot rely on the install system reliably invoking the install profile's
 * hook_form_alter in the early installer, so the only way to ensure that we
 * can customize this form is to decorate its form class.
 *
 * @see \Drupal\RecipeKit\Installer\Hooks::installTasksAlter()
 *
 * @internal
 *   This is an internal part of Recipe Installer Kit and may be changed or
 *   removed at any time, without warning. External code should not interact
 *   with this class.
 */
final class SiteSettingsFormDecorator implements FormInterface, ContainerInjectionInterface {

  public function __construct(
    private readonly SiteSettingsForm $decorated,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): self {
    return new self(
      SiteSettingsForm::create($container),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return $this->decorated->getFormId();
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form = $this->decorated->buildForm($form, $form_state);

    $sqlite_key = 'Drupal\sqlite\Driver\Database\sqlite';
    // Default to SQLite, if available, because it doesn't require any
    // additional configuration.
    if (extension_loaded('pdo_sqlite') && array_key_exists($sqlite_key, $form['driver']['#options'])) {
      $form['driver']['#default_value'] = $sqlite_key;

      // The database file path has a sensible default value, so move it into the
      // advanced options.
      $form['settings'][$sqlite_key]['advanced_options']['database'] = $form['settings'][$sqlite_key]['database'];
      unset($form['settings'][$sqlite_key]['database']);
    }
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    $this->decorated->validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->decorated->submitForm($form, $form_state);
  }

}
