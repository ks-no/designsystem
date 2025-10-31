import { Component } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'ksd-alert',
  template: ` <ng-content />`,
  host: {
    class: 'ds-alert',
  },
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
})
export class Alert {}
