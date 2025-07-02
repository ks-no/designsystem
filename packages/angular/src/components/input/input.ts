import {
  booleanAttribute,
  Directive,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core'
import { CommonInputs } from '../common-inputs'
import { FieldState } from '../field/field-state'

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
    '[attr.aria-invalid]': 'fieldState.hasError() ? true:  null',
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
   * Displays a character counter. pass a number to set a limit.
   */
  counter = input(0, { transform: numberAttribute })

  protected fieldState = inject(FieldState)

  onClick(event: Event) {
    if (this.readonly()) {
      event.preventDefault()
    }
  }
}
