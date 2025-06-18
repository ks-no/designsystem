import { Component, model } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'input[ksd-checkbox]',
  hostDirectives: [{
    directive: CommonInputs,
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
