import { Component } from '@angular/core'

@Component({
  selector: 'fieldset[ksd-fieldset]',
  host: {
    class: 'ds-fieldset',
  },
  template: ` <ng-content /> `,
})
export class Fieldset {}
