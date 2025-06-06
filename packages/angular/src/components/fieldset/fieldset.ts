import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fieldset[ksdFieldset]',
  host: {
    role: 'fieldset',
    class: 'ds-fieldset',
  },
  template: ` <ng-content /> `,
})
export class Fieldset { }
