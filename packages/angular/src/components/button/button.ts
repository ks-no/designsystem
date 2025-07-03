import { booleanAttribute, Component, input } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'button[ksd-button], a[ksd-button]',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    class: 'ds-button',
    '[attr.data-variant]': 'variant()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
  template: `<ng-content />`,
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
  readonly loading = input<boolean>(false)

  /**
   * Whether the input is readonly
   */
  readonly readonly = input(false, { transform: booleanAttribute })

  /**
   * Disables element
   */
  readonly disabled = input(false, { transform: booleanAttribute })
}
