import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import '@u-elements/u-tabs'

@Component({
  selector: `ksd-tabs-panel`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<u-tabpanel><ng-content /></u-tabpanel>`,
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPanel {}
