import { Component } from '@angular/core'

@Component({
  selector: 'p[ksd-validation-message]',
  template: `<ng-content />`,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class ValidationMessage {}
