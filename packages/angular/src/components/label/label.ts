import { Component, model } from '@angular/core'

@Component({
  selector: 'ksd-label',
  template: `<label class="ds-label" [for]="for()"><ng-content /></label>`,
  styles: ` `,
})
export class Label {
  for = model<string>()
}
