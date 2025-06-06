import { Component, model } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[ksd-checkbox]',
  host: {
    type: 'checkbox',
    class: 'ds-input',
    '[attr.id]': 'id()',
  },
  template: ``,
})
export class Checkbox {
  id = model<string>()

  // dataSize = signal<DefaultProps>('')
  // dataColor
  // ariaLabel
  // error
  // ariaLabelledBy
}
