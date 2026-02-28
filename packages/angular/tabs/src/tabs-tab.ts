import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

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
   * Hack to get the content of the tab from outside so that we can
   * keep the dom structure needed without additional host elements
   */
  templateRef = viewChild<TemplateRef<unknown>>('tpl')
}
