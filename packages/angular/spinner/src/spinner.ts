/* eslint-disable @angular-eslint/no-input-rename */
import { booleanAttribute, Component, input } from '@angular/core'
import { HostColor, Size } from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-spinner',
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <svg
      [attr.data-size]="dataSize()"
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
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
  hostDirectives: [
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
})
export class Spinner {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */

  // Spinner doesnt inherit size from wrapping element (bug?) so we cant use hostdirective here
  readonly dataSize = input<Size | 'xs' | 'xl' | '2xs'>(undefined, {
    alias: 'data-size',
  })
  /**
   * Aria-label for the spinner
   */
  readonly ariaLabel = input<string>(undefined, { alias: 'aria-label' })

  /**
   * Aria-hidden for the spinner
   */
  readonly ariaHidden = input(undefined, {
    transform: booleanAttribute,
    alias: 'aria-hidden',
  })
}
