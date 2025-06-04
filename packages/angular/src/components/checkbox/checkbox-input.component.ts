import { Component, model } from '@angular/core'

@Component({
  selector: 'input[ksdCheckbox]',
  host: {
    type: 'checkbox',
    class: 'ds-input',
    '[attr.id]': 'id()',
  },
  template: ``,
})
export class CheckboxDirective {
  id = model<string>()
}
