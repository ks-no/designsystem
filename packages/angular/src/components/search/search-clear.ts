import { Directive, input, output } from '@angular/core'

/**
 * Search clear button
 *
 * Used within Search to provide a clear button.
 *
 * @param {string} [aria-label] - Aria label for the button
 * @param {EventEmitter<void>} [clearInput] - Emitted when the clear button is clicked
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[ksd-search-clear]',
  standalone: true,
  host: {
    class: 'ds-button',
    type: 'reset',
    '[attr.data-variant]': "'tertiary'",
    '[attr.aria-label]': 'this.ariaLabel()',
    '(click)': 'handleClear($event)',
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

  handleClear(e: Event): void {
    const target = e.target as HTMLButtonElement
    let inputElement: HTMLElement | null | undefined = null

    if (target instanceof HTMLElement) {
      inputElement = target.closest('.ds-search')?.querySelector('input')
    }

    if (!inputElement) throw new Error('Input is missing')

    if (!(inputElement instanceof HTMLInputElement)) {
      throw new Error('Input is not an input element')
    }

    e.preventDefault()
    inputElement.value = ''
    this.clearInput.emit()
    inputElement.focus()
  }
}
