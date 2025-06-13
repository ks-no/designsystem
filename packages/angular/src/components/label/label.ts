import { Component, model } from '@angular/core'

@Component({
  selector: 'ksd-label',
  // hostDirectives: [{
  //   directive: DefaultInputs,
  //   inputs: ['dataSize', 'dataColor']
  // }],
  template: `<label class="ds-label" [for]="for()"><ng-content /></label>`,
})
export class Label {
  for = model<string>()
}
