import {
  booleanAttribute,
  Directive,
  input,
  model,
  numberAttribute,
  signal,
} from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ksd-input], textarea[ksd-input]',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    class: 'ds-input',
    '[attr.readonly]': 'readonly() ? true : null',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-invalid]': 'invalid() ? true:  null',
    '(click)': 'onClick($event)',
    '(input)': 'value.set($event.target.value)',
  },
})
export class Input {
  /**
   * The value of the input
   */
  value = signal('')

  /**
   * Whether the input is readonly
   */
  readonly readonly = input(false, { transform: booleanAttribute })

  /**
   * Disables element
   */
  readonly disabled = input(false, { transform: booleanAttribute })

  /**
   * Whether the input should be marked as invalid
   */
  invalid = model(false)

  /**
   * Displays a character counter. pass a number to set a limit.
   */
  counter = input(0, { transform: numberAttribute })

  onClick(event: Event) {
    if (this.readonly()) {
      event.preventDefault()
    }
  }
}
