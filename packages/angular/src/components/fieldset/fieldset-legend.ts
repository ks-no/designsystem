import { Component } from '@angular/core'

@Component({
  selector: 'legend[ksd-fieldset-legend]',
  host: {
    role: 'legend',
    class: 'ds-label',
  },
  template: ` <ng-content /> `,
})
export class FieldsetLegend {}
