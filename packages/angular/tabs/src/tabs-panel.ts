import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'

@Component({
  selector: `ksd-tabs-panel`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ds-tabpanel>
      <ng-content />
    </ds-tabpanel>
  `,
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPanel {}
