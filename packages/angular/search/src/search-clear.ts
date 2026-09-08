import { Directive, input } from '@angular/core'

/**
 * Search clear button
 *
 * Used within Search to provide a clear button.
 * ds-suggestion clears and refocuses the input, and fires an `input` event on it.
 *
 * @param {string} [aria-label] - Aria label for the button.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[ksd-search-clear]',
  host: {
    class: 'ds-button',
    type: 'reset',
    '[attr.data-variant]': "'tertiary'",
    '[attr.aria-label]': 'this.ariaLabel()',
  },
})
export class SearchClear {
  /**
   * Aria label for the button
   * @default 'Tøm'
   */
  readonly ariaLabel = input('Tøm', { alias: 'aria-label' })
}
