import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'legend[ksd-fieldset-legend]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-label',
  },
  template: ` <ng-content /> `,
})
export class FieldsetLegend {}
