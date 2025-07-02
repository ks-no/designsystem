import { Component } from '@angular/core'

@Component({
  selector: '[ksd-error]',
  template: `<ng-content />`,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class FieldError {}
