import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { Spinner } from '@ks-digital/designsystem-angular/spinner'

@Component({
  selector: 'button[ksd-button], a[ksd-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  imports: [Spinner],
  host: {
    class: 'ds-button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-icon]': 'icon() || dataIcon() || null',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-busy]': 'loading() ? true : null',
  },
  styles: `
    /* Ensure transcluded icons are aligned properly */
    :host ::ng-deep > * {
      display: inline-flex;
    }

    :host ::ng-deep ng-icon {
      font-size: var(--ng-icon-size, 1.3em);
    }
  `,

  template: `
    @if (loading()) {
      <ksd-spinner aria-hidden="true" />
    }
    @if (!(loading() && (icon() || dataIcon()))) {
      <ng-content />
    }
  `,
})
export class Button {
  /**
   * Specify which variant to use
   * @default 'primary'
   */
  readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary', {
    alias: 'data-variant',
  })

  /**
   * Toggle loading state.
   * Pass an element if you want to display a custom loader.
   *
   * @default false
   */
  readonly loading = input(false, { transform: booleanAttribute })

  /**
   * Disables element
   */
  readonly disabled = input(false, { transform: booleanAttribute })

  /**
   * If this is a button with only an icon. When combined with loading, a spinner will be shown instead of the icon.
   * @deprecated Use `data-icon` instead.
   */
  readonly icon = input(false, { transform: booleanAttribute })

  /** If this is a button with only an icon. When combined with loading, a spinner will be shown instead of the icon. */
  readonly dataIcon = input(false, {
    transform: booleanAttribute,
    alias: 'data-icon',
  })
}
