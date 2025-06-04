import { Component } from '@angular/core'

@Component({
  selector: 'legend[ksdFieldsetLegend]',
  host: {
    role: 'legend',
    class: 'ds-label',
  },
  template: ` <ng-content /> `,
})
export class FieldsetLegend {}
