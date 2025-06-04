import { Component , input} from '@angular/core'

@Component({
  selector: 'label[ksdLabel]',
  template: `<ng-content />`,
  host: {
    '[attr.for]': 'for()',
  }
})
export class Label {
  for = input.required<string>();
}
