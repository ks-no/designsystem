import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
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
  template: `<u-tab><ng-content /></u-tab>`,
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
}
