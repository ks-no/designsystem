import { Component } from '@angular/core'
import { CommonInputs } from '../common-inputs'
import { Input } from '../input/input'

@Component({
  selector: 'input[ksd-checkbox]',
  hostDirectives: [{
    directive: CommonInputs,
    inputs: ['data-size', 'data-color']
  }, {
      directive: Input,
      inputs: ['id', 'aria-describedby', 'readonly'],

  }],
  host: {
    type: 'checkbox',
  },
  template: ``,
})
export class Checkbox { }
