import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {
  HostColor,
  HostSize,
  randomId,
} from '@ks-digital/designsystem-angular/__internals'
import { Tabs } from './tabs'

@Component({
  selector: `ksd-tabs-tab`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ` <ng-template #tpl><ng-content /></ng-template> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
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
export class TabsTab {
  /**
   * Unique value that will be set in the Tabs components state when the tab is activated
   */
  readonly value = input<string>()

  /**
   * Hack to get the content of the tab from outside so that we can
   * keep the dom structure needed without additional host elements
   */
  template = viewChild<TemplateRef<unknown>>('tpl')
}
