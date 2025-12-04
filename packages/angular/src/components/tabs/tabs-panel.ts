import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core'
import { randomId } from '../../utils/random-id'
import { Tabs } from './tabs'

@Component({
  selector: `ksd-tabs-panel`,
  template: `<ng-content />`,
  host: {
    role: 'tabpanel',
    '[id]': 'panelId()',
    '[hidden]': '!isSelected()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[tabIndex]': 'tabIndex()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPanel implements AfterContentInit {
  private elementRef = inject(ElementRef)
  private group = inject(Tabs)
  private hasTabbableElement = signal(false)

  /**
   * When this value is selected as the current state, render this TabsPanel component. Must match the value of a Tabs.Tab component.
   */
  readonly value = input.required<string>()
  readonly id = input<string>()

  protected readonly labelledBy = computed(() =>
    this.group
      .tabs()
      .find((tab) => tab.value() === this.value())
      ?.buttonId(),
  )
  protected readonly panelId = computed(
    () => this.id() ?? 'tabpanel-' + randomId(),
  )
  protected isSelected = computed(() => this.group.value() === this.value())
  protected tabIndex = computed(() => (this.hasTabbableElement() ? -1 : 0))

  constructor() {
    effect(() => {
      this.group
        .tabs()
        .find((tab) => tab.value() === this.value())
        ?.ariaControls.set(this.panelId())
    })
  }

  ngAfterContentInit(): void {
    this.hasTabbableElement.set(
      this.elementRef.nativeElement.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    )
  }
}
