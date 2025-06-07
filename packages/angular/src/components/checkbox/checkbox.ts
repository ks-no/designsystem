import { Component, model } from '@angular/core'

@Component({
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
