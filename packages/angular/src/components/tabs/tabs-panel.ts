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
  readonly elementRef = inject(ElementRef)

  group = inject(Tabs)
  id = input<string>()
  value = input.required<string>()
  isSelected = computed(() => this.group.value() === this.value())
  labelledBy = computed(() =>
    this.group
      .tabs()
      .find((tab) => tab.value() === this.value())
      ?.buttonId(),
  )
  readonly panelId = computed(() => this.id() ?? 'tabpanel-' + randomId())
  hasTabbableElement = signal(false)
  tabIndex = computed(() => (this.hasTabbableElement() ? -1 : 0))

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
      document.querySelectorAll(
        `#${this.panelId()} > button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`,
      ).length > 0,
    )
  }
}
