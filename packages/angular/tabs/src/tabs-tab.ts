import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

export interface TabClickEvent {
  index: number
  tabId: string | undefined
}

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
   * Stable identifier for tab
   *
   * If omitted, `tabClicked` emits `tabId: undefined`.
   */
  readonly tabId = input<string>()

  /**
   * Emits tab click details when this tab is clicked.
   */
  readonly tabClicked = output<TabClickEvent>()

  /**
   * Hack to get the content of the tab from outside so that we can
   * keep the dom structure needed without additional host elements
   */
  templateRef = viewChild<TemplateRef<unknown>>('tpl')

  /* Exposed function so Tabs can emit tab click events */
  emitTabClicked(event: TabClickEvent) {
    this.tabClicked.emit(event)
  }
}
