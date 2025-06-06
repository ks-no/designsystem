import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'p[ksd-validation-message]',
  template: `<ng-content />`,
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class ValidationMessage { }
