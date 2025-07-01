import { booleanAttribute, Component, input, model } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'input[ksd-checkbox]',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    type: 'checkbox',
    class: 'ds-input',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.readonly]': 'readonly() ? true : null',
    '(click)': 'onClick($event)',
  },
  template: ``,
})
export class Checkbox {
  id = model<string>()
  ariaDescribedBy = model<string | undefined>(undefined, {
    alias: 'aria-describedby',
  })
  readonly = input(false, { transform: booleanAttribute })

  onClick(event: Event) {
    if (this.readonly()) {
      event.preventDefault()
    }
  }
}
