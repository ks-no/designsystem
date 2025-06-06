import { Component, model } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'label[ksdLabel]',
  template: `<ng-content />`,
  host: {
    '[attr.for]': 'for()',
  },
})
export class Label {
  for = model<string>()
}
