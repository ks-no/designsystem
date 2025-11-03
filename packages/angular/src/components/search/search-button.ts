import { Directive, ElementRef, inject, input } from '@angular/core'
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
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[ksd-search-button]',
  standalone: true,
  host: {
    class: 'ds-button',
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
   * @default 'primary'
   *
   */
  readonly variant = input<'primary' | 'secondary'>('primary')

  /**
   * Aria label for the button
   */
  readonly ariaLabel = input('', { alias: 'aria-label' })
}
