import { Component, input, OnInit } from '@angular/core'
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
@Component({
  selector: 'button[ksd-search-button]',
  standalone: true,
  template: ` <ng-content></ng-content> `,
  host: {
    type: 'submit',
    '[attr.aria-label]': 'this.ariaLabel()',
    '[attr.variant]': 'this.variant()',
  },
})
export class SearchButton extends Button implements OnInit {
  /**
   * Specify which button variant to use
   *
   * Note: \'tertiary\' variant is not supported, but needed to be accepted
   * as input to avoid compiler errors for narrowing types.
   *
   * @default 'primary'
   *
   */
  override readonly variant = input<'primary' | 'secondary' | 'tertiary'>(
    'primary',
  )

  /**
   * Aria label for the button
   */
  protected readonly ariaLabel = input('', { alias: 'aria-label' })

  /**
   * Runtime check for unsupported 'tertiary' variant
   */
  ngOnInit(): void {
    if (this.variant() === 'tertiary') {
      logIfDevMode({
        component: 'SearchButton',
        message:
          "The 'tertiary' variant is not supported - use 'primary' or 'secondary'.",
      })
    }
  }
}
