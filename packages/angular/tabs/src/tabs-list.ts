import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import '@u-elements/u-tabs'

@Component({
  selector: `ksd-tabs-list`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <u-tablist>
      <ng-content select="button[ksd-tabs-tab]" />
    </u-tablist>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {}
