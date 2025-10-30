import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { Button } from '../button'

/**
 * Search button
 *
 * Used within SearchComponent to provide a submit button.
 *
 * @param {('primary' | 'secondary')} [variant] - Specify which button variant to use
 * @param {string} [aria-label] - Aria label for the button
 *
 */
@Directive({
  selector: 'button[ksdSearchButton]',
  standalone: true,
  host: {
    type: 'submit',
    '[attr.aria-label]': 'this.ariaLabel()',
    '[attr.variant]': 'this.variant()',
  },
})
export class SearchButton {
  private readonly button = inject(ElementRef<Button>)

  /**
   * Specify which button variant to use
   *
   * Note: Since the `SearchButton` is an instance of `Button`,
   * but should only allow `'primary'` and `'secondary'` variants.
   * `'tertiary'` will compile but will log a warning in dev mode.
   *
   * @default 'primary'
   *
   */
  readonly variant = input<'primary' | 'secondary'>('primary')

  /**
   * Aria label for the button
   */
  readonly ariaLabel = input('', { alias: 'aria-label' })

  /**
   * Check that component is a ksd-button at runtime
   */
  constructor() {
    afterNextRender(() => {
      const hasKsdButton = this.button.nativeElement.hasAttribute('ksd-button')
      const allowedVariants = ['primary', 'secondary']
      if (!hasKsdButton) {
        logIfDevMode({
          component: 'SearchButton',
          message:
            'Missing required elements: ksd-button must be provided for the SearchButton. Check imports and markup.',
        })
      }
      if (!allowedVariants.includes(this.variant())) {
        logIfDevMode({
          component: 'SearchButton',
          message: `Invalid variant "${this.variant()}" provided for SearchButton. Allowed variants are: ${allowedVariants.join(
            ', ',
          )}.`,
        })
      }
    })
  }
}
