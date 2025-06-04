import { Component } from '@angular/core'

@Component({
  selector: 'p[ksdValidationMessage]',
  template: `<ng-content />`,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class ValidationMessage {}
