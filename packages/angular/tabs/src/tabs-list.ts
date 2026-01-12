import { ChangeDetectionStrategy, Component } from '@angular/core'
import '@u-elements/u-tabs'

@Component({
  selector: `ksd-tabs-list`,
  template: `<ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {}
