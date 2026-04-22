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
        @for (tab of tabs(); track tab; let index = $index) {
          <ds-tab (click)="onTabClick(index, tab)">
            <ng-container *ngTemplateOutlet="tab.templateRef()" />
          </ds-tab>
        }
      </ds-tablist>
      <ng-content select="ksd-tabs-panel" />
    </ds-tabs>
  `,
  styles: `
    :host
      ::ng-deep
      :is(.ds-tabs [role='tab'], .ds-tabs ds-tab, .ds-tabs u-tab)
      > :where(ng-icon, svg, img) {
      font-size: calc(1em * 1.25);
      width: 1em;
      height: 1em;
    }
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

  protected onTabClick(index: number, tab: TabsTab) {
    tab.emitTabClicked(index)
  }
}
