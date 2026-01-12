import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: `ksd-tabs-panel`,
  template: `<ng-content />`,
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPanel { }
