import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { NgTemplateOutlet } from '@angular/common';
import '@u-elements/u-tabs'
import { TabsTab } from './tabs-tab'

@Component({
  selector: `ksd-tabs`,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <u-tabs class="ds-tabs">
      <u-tablist>
        @for (tab of tabs(); track tab) {
          <u-tab>
            <ng-container *ngTemplateOutlet="tab.templateRef()" />
          </u-tab>
        }
      </u-tablist>
      <ng-content select="ksd-tabs-panel" />
    </u-tabs>
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
