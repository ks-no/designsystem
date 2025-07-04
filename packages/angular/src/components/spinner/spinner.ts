import { booleanAttribute, Component, input } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'ksd-spinner',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    '[attr.aria-hidden]': 'ariaHidden() ? true:  null',
    '[attr.aria-label]': 'ariaLabel() ?? undefined',
  },
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <svg class="ds-spinner" role="img" viewBox="0 0 50 50">
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
   * Aria-hidden for the spinner
   */
  readonly ariaHidden = input(undefined, {
    transform: booleanAttribute,
    alias: 'aria-hidden',
  })
}
