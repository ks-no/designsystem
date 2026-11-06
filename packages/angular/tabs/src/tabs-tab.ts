import {
  booleanAttribute,
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

/**
 * Payload emitted from `tabClicked` on both `ksd-tabs` and `ksd-tabs-tab`.
 */
export interface TabClickEvent {
  /**
   * Zero-based index of the clicked tab in its current render order.
   */
  index: number

  /**
   * Consumer-provided stable tab identifier from `tabId`.
   *
   * `undefined` when `tabId` is not provided.
   */
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
   * Stable identifier for this tab.
   *
   * Recommended for logic such as analytics, routing and persisted state.
   *
   * If omitted, `tabClicked` emits `tabId: undefined`.
   */
  readonly tabId = input<string>()

  /**
   * Marks this tab as the selected tab, forwarded to the underlying `ds-tab`.
   *
   * @default false
   */
  readonly ariaSelected = input(false, {
    alias: 'aria-selected',
    transform: booleanAttribute,
  })

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
