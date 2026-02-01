import { booleanAttribute, Directive, input, signal } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ksd-input], textarea[ksd-input], select[ksd-input]',
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  host: {
    class: 'ds-input',
    '[attr.readonly]': 'readonly() ? true : null',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-invalid]': 'ariaInvalid() ? true : null',
    '(click)': 'onClick($event)',
    '(input)': 'onInput($event)',
  },
})
export class Input {
  /**
   * The value of the input
   */
  value = signal<string | undefined>('')

  /**
   * Whether the input is readonly
   */
  readonly readonly = input(false, { transform: booleanAttribute })

  /**
   * Disables element
   */
  readonly disabled = input(false, { transform: booleanAttribute })

  /**
   * Whether the element is invalid.
   */
  readonly ariaInvalid = input(false, {
    transform: booleanAttribute,
    alias: 'aria-invalid',
  })

  onClick(event: Event) {
    if (this.readonly()) {
      event.preventDefault()
    }
  }

  onInput(event: Event) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | null
    const val = target?.value
    this.value.set(val ?? '')
  }
}
