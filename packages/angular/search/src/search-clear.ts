import { Directive, input, output } from '@angular/core'

/**
 * Search clear button
 *
 * Used within Search to provide a clear button.
 *
 * @param {string} [aria-label] - Aria label for the button.
 *
 * @event clearInput - Emitted when the clear button is clicked.
 * Use this to notify controlled forms that the input should be cleared.
 *
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[ksd-search-clear]',
  host: {
    class: 'ds-button',
    type: 'reset',
    '[attr.data-variant]': "'tertiary'",
    '[attr.aria-label]': 'this.ariaLabel()',
    '(click)': 'clearInput.emit()',
  },
})
export class SearchClear {
  /**
   * Aria label for the button
   * @default 'Tøm'
   */
  readonly ariaLabel = input('Tøm', { alias: 'aria-label' })

  /**
   * Output to notify controlled forms that input should be cleared
   */
  clearInput = output<void>()
}
