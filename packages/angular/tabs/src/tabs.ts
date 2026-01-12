import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  input,
  model,
  signal,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { NgTemplateOutlet } from '@angular/common';
import '@u-elements/u-tabs'
import { TabsTab } from './tabs-tab'

@Component({
  selector: `ksd-tabs`,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <u-tabs class="ds-tabs">
      <u-tablist>
        @for (tab of tabs(); track tab) {
          <u-tab>
            <ng-container *ngTemplateOutlet="tab.template()" />
          </u-tab>
        }
      </u-tablist>
      <ng-content select="ksd-tabs-panel" />
    </u-tabs>
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
  readonly defaultValue = input<string>()
  readonly value = model<string>('')
  readonly selectedValue = computed(() =>
    this.tabs()[this.selectedIndex()]?.value(),
  )
  readonly tabs = contentChildren(TabsTab, { descendants: true })
  private selectedIndex = signal<number>(0)

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
        this.selectTab(
          (this.selectedIndex() + this.tabs().length - 1) % this.tabs().length,
        )
        event.preventDefault()
        break
      case 'ArrowRight':
      case 'ArrowDown':
        this.selectTab((this.selectedIndex() + 1) % this.tabs().length)
        event.preventDefault()
        break
      case 'Enter':
      case 'Space':
        {
          const value = this.selectedValue()
          console.log({ value })
          if (value) {
            this.changeTab(value)
          }
        }
        event.preventDefault()
        break
      case 'Home':
        this.selectTab(0)
        event.preventDefault()
        break
      case 'End':
        this.selectTab(this.tabs().length - 1)
        event.preventDefault()
        break
    }
  }

  public changeTab(value: string) {
    const index = this.tabs().findIndex((tab) => tab.value() === value)
    this.value.set(value)
    this.selectTab(index)
  }

  private selectTab(index: number) {
    this.selectedIndex.set(index)
    // this.tabs()[index]?.elementRef.nativeElement.focus()
  }
}
