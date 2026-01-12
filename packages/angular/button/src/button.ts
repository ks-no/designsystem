/* eslint-disable @angular-eslint/no-input-rename */
import { booleanAttribute, Component, input } from '@angular/core'
import {
  HostSeverityColors,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { Spinner } from '@ks-digital/designsystem-angular/spinner'

@Component({
  selector: 'button[ksd-button], a[ksd-button]',
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostSeverityColors,
      inputs: ['data-color'],
    },
  ],
  imports: [Spinner],
  host: {
    class: 'ds-button',
    type: 'button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-icon]': 'icon() || null',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-busy]': 'loading() ? true : null',
  },
  styles: `
    /* Ensure transcluded icons are aligned properly */
    :host ::ng-deep > * {
      display: inline-flex;
    }
  `,

  template: `
    @if (loading()) {
      <ksd-spinner aria-hidden="true" />
    }
    <ng-content />
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
   * If this is a button with only an icon
   */
  readonly icon = input(false, { transform: booleanAttribute })
}
