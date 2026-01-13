/* eslint-disable @angular-eslint/no-input-rename */
import { booleanAttribute, Component, input } from '@angular/core'
import { Color, Size } from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-spinner',
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <svg
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
      [attr.data-size]="dataSize()"
      [attr.data-color]="dataColor()"
    >
      <circle
        class="ds-spinner__background"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
      <circle
        class="ds-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
  `,
})
export class Spinner {
  /**
   * Aria-label for the spinner
   */
  readonly ariaLabel = input<string>(undefined, { alias: 'aria-label' })

  /**
   * Aria-label for the spinner
   */
  readonly dataSize = input<Size | 'xs' | 'xl' | '2xs'>(undefined, {
    alias: 'data-size',
  })

  /**
   * Aria-label for the spinner
   */
  readonly dataColor = input<Color>(undefined, { alias: 'data-color' })

  /**
   * Aria-hidden for the spinner
   */
  readonly ariaHidden = input(undefined, {
    transform: booleanAttribute,
    alias: 'aria-hidden',
  })
}
