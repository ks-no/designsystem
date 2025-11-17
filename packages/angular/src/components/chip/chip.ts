import { Component } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'label[ksd-chip], button[ksd-chip]',
  template: `<ng-content />`,
  host: {
    class: 'ds-chip',
  },
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
})
export class Chip {}
