import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  input,
  model,
  signal,
} from '@angular/core'
import {
  HostSeverityColors,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { TabsTab } from './tabs-tab'

@Component({
  selector: `ksd-tabs`,
  template: `
    <div class="ds-tabs">
      <ng-content select="ksd-tabs-list" />
      <ng-content select="ksd-tabs-panel" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostSeverityColors,
      inputs: ['data-color'],
    },
  ],
})
export class Tabs {
  readonly defaultValue = input<string>()
  readonly value = model<string>('')
  readonly focusedValue = computed(() =>
    this.tabs()[this.focusedIndex()]?.value(),
  )
  readonly tabs = contentChildren(TabsTab, { descendants: true })
  private focusedIndex = signal<number>(0)

  constructor() {
    effect(() => {
      if (!this.value()) {
        const value = this.defaultValue()
        if (undefined !== value) {
          this.changeTab(value)
        }
      }
    })
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
      case 'ArrowUp':
        this.focusTab(
          (this.focusedIndex() + this.tabs().length - 1) % this.tabs().length,
        )
        event.preventDefault()
        break
      case 'ArrowRight':
      case 'ArrowDown':
        this.focusTab((this.focusedIndex() + 1) % this.tabs().length)
        event.preventDefault()
        break
      case 'Enter':
      case 'Space':
        {
          const value = this.focusedValue()
          if (value) {
            this.changeTab(value)
          }
        }
        event.preventDefault()
        break
      case 'Home':
        this.focusTab(0)
        event.preventDefault()
        break
      case 'End':
        this.focusTab(this.tabs().length - 1)
        event.preventDefault()
        break
    }
  }

  public changeTab(value: string) {
    const index = this.tabs().findIndex((tab) => tab.value() === value)
    this.value.set(value)
    this.focusTab(index)
  }

  private focusTab(index: number) {
    this.focusedIndex.set(index)
    this.tabs()[index]?.elementRef.nativeElement.focus()
  }
}
