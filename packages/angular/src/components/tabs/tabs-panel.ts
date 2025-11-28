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

  readonly id = input<string>()
  readonly value = input.required<string>()
  readonly labelledBy = computed(() =>
    this.group
      .tabs()
      .find((tab) => tab.value() === this.value())
      ?.buttonId(),
  )
  readonly panelId = computed(() => this.id() ?? 'tabpanel-' + randomId())

  protected isSelected = computed(() => this.group.value() === this.value())
  protected hasTabbableElement = signal(false)
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
