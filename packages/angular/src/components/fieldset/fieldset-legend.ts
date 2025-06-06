import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'legend[ksdFieldsetLegend]',
  host: {
    role: 'legend',
    class: 'ds-label',
  },
  template: ` <ng-content /> `,
})
export class FieldsetLegend { }
