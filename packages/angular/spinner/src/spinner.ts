import { booleanAttribute, Component, input } from '@angular/core'
import { HostColor } from '@ks-digital/designsystem-angular/__internals'
import { SpinnerSize } from './spinner-sizes'

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

  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */
  readonly dataSize = input<SpinnerSize>(undefined, {
    alias: 'data-size',
  })
}
