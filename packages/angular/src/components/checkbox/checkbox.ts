import { Component, model } from '@angular/core'
import { DefaultInputs } from '../default-inputs'

@Component({
  selector: 'input[ksd-checkbox]',
  hostDirectives: [{
    directive: DefaultInputs,
    inputs: ['data-size', 'data-color']
  }],
  host: {
    type: 'checkbox',
    class: 'ds-input',
    '[attr.id]': 'id()',
  },
  template: ``,
})
export class Checkbox {
  id = model<string>()
}
