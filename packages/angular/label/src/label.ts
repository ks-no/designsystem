import { Component } from '@angular/core'
import { CommonInputs } from '@ks-digital/designsystem-angular/utils'

@Component({
  selector: 'ksd-label',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  template: `
    <!-- eslint-disable @angular-eslint/template/label-has-associated-control -- Fieldobserver handles binding the label to the input -->
    <label class="ds-label"><ng-content /></label>
  `,
})
export class Label {}
