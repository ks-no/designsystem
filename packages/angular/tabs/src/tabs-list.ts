import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: `ksd-tabs-list`,
  template: `<ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {}
