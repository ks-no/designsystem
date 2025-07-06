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
    '[attr.data-icon]': 'icon() ?? undefined',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-busy]': 'loading() ? true : null',
  },
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
   * Toggle icon only styling, pass icon as children
   * @default false
   */
  readonly icon = input<string | undefined>(undefined)
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
}
