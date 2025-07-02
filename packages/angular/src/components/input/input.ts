import {
  booleanAttribute,
  Directive,
  input,
  numberAttribute,
  signal,
} from '@angular/core'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ksd-input], textarea[ksd-input]',
  host: {
    class: 'ds-input',
    '[attr.readonly]': 'readonly() ? true : null',
    '[attr.disabled]': 'disabled() ? true : null',
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

  onClick(event: Event) {
    if (this.readonly()) {
      event.preventDefault()
    }
  }
}
