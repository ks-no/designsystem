import { Component, signal } from '@angular/core'
import { randomId } from '../../utils/random-id'

@Component({
  selector: '[ksd-checkbox-description]',
  host: {
    'data-field': 'description',
    '[attr.id]': 'id()',
  },
  template: `<ng-content />`,
})
export class CheckboxDescription {
  id = signal(randomId()).asReadonly()
}
