import { Component, model } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'ksd-label',
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  template: `<label class="ds-label" [for]="for()"><ng-content /></label>`,
})
export class Label {
  for = model<string>()
}
