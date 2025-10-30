import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { Button } from '../button'

/**
 * Search clear button
 *
 * Used within SearchComponent to provide a clear button.
 *
 * @param {string} [aria-label] - Aria label for the button
 * @param {EventEmitter<void>} [clearInput] - Emitted when the clear button is clicked
 */
@Directive({
  selector: 'button[ksdSearchClear]',
  standalone: true,
  host: {
    type: 'reset',
    '[attr.data-variant]': "'tertiary'",
    '[attr.aria-label]': 'this.ariaLabel()',
    '(click)': 'handleClear($event)',
  },
})
export class SearchClear {
  private readonly button = inject(ElementRef<Button>)

  /**
   * Aria label for the button
   * @default 'Tøm'
   */
  readonly ariaLabel = input('Tøm', { alias: 'aria-label' })

  /**
   * Output to notify controlled forms that input should be cleared
   */
  clearInput = output<void>()

  /**
   * Check that component is a ksd-button at runtime
   */
  constructor() {
    afterNextRender(() => {
      const hasKsdButton = this.button.nativeElement.hasAttribute('ksd-button')
      if (!hasKsdButton) {
        logIfDevMode({
          component: 'SearchClear',
          message:
            'Missing required elements: ksd-button must be provided for the SearchClear. Check imports and markup.',
        })
      }
    })
  }

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
