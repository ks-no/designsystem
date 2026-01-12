import { ChangeDetectionStrategy, Component } from '@angular/core'
import '@u-elements/u-tabs'

@Component({
  selector: `ksd-tabs-list`,
  template: ` <ng-content select="button[ksd-tabs-tab]" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList { }
