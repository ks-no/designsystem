import { Component, signal } from '@angular/core';
import { randomId } from '../../utils/random-id';

@Component({
  selector: 'p[ksd-validation-message]',
  template: `<ng-content />`,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
    '[attr.id]': 'id()',
  },
})
export class ValidationMessage {
  id = signal(randomId())
}
