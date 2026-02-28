import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { TabsTab } from './tabs-tab'

@Component({
  selector: `ksd-tabs`,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ds-tabs class="ds-tabs">
      <ds-tablist>
        @for (tab of tabs(); track tab) {
          <ds-tab>
            <ng-container *ngTemplateOutlet="tab.templateRef()" />
          </ds-tab>
        }
      </ds-tablist>
      <ng-content select="ksd-tabs-panel" />
    </ds-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
})
export class Tabs {
  readonly tabs = contentChildren(TabsTab, { descendants: true })
}
