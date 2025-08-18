import { booleanAttribute, Component, input } from '@angular/core'
import { CommonInputs } from '../common-inputs'
import { Spinner } from '../spinner/spinner'

@Component({
  selector: 'button[ksd-button], a[ksd-button]',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
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
  readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary')

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
