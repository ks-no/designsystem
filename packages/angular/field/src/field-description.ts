import { Component } from '@angular/core'

@Component({
  selector: '[ksd-field-description]',
  host: {
    'data-field': 'description',
  },
  template: `<ng-content />`,
})
export class FieldDescription {}
