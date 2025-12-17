import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: `ksd-tabs-list`,
  template: `<ng-content select="button[ksd-tabs-tab]" />`,
  host: {
    role: 'tablist',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {}
