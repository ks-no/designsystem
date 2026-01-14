import { Component } from '@angular/core'
import { CommonInputs } from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: '[ksd-pagination]',
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    class: 'ds-pagination',
  },
})
export class Pagination {}
