import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
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
  selector: `button[ksd-tabs-tab]`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<ng-template #tpl><ng-content /></ng-template>`,
  host: {},
  styles: `
    :host {
    }
  `,
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
  readonly value = input.required<string>()

  template = viewChild<TemplateRef<unknown>>('tpl')

  constructor() {
    effect(() => {
      console.log('template', this.template())
    })
  }
}
