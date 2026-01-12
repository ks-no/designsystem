import { Component } from '@angular/core'
import {
  HostSeverityColors,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-label',
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostSeverityColors,
      inputs: ['data-color'],
    },
  ],
  template: `
    <!-- eslint-disable @angular-eslint/template/label-has-associated-control -- Fieldobserver handles binding the label to the input -->
    <label class="ds-label"><ng-content /></label>
  `,
})
export class Label {}
