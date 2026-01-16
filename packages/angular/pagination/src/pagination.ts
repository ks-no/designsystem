import { Component } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: '[ksd-pagination]',
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  host: {
    class: 'ds-pagination',
  },
})
export class Pagination {}
