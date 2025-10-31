import { Component } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'a[ksd-link]',
  template: `<ng-content />`,
  host: {
    class: 'ds-link',
  },
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
})
export class Link {}
