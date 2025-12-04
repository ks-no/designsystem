import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core'
import { randomId } from '../../utils/random-id'
import { CommonInputs } from '../common-inputs'
import { Tabs } from './tabs'

@Component({
  selector: `button[ksd-tabs-tab]`,
  template: ` <ng-content /> `,
  host: {
    role: 'tab',
    class: 'ds-button',
    '[id]': 'buttonId()',
    '[attr.aria-controls]': 'ariaControls()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.tab-index]': 'isFocused() ? 0 : -1',
    '(click)': 'tabs.changeTab(value())',
    '(keydown)': 'tabs.onKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
})
export class TabsTab {
  /**
   * Unique value that will be set in the Tabs components state when the tab is activated
   */
  readonly value = input.required<string>()
  readonly id = input<string>()
  readonly elementRef = inject(ElementRef)
  readonly ariaControls = signal<string | undefined>(undefined)
  readonly buttonId = computed(() => this.id() ?? 'tab-' + randomId())

  protected tabs = inject(Tabs)
  protected isFocused = computed(
    () => this.tabs.focusedValue() === this.value(),
  )
  protected isSelected = computed(() => this.tabs.value() === this.value())
}
