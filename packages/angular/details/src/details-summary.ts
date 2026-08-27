import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ksd-details-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class DetailsSummary {}
