import { Component, input } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'label[ksd-chip], button[ksd-chip]',
  template: `<ng-content />`,
  host: {
    class: 'ds-chip',
  },
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
export class Chip {
  /**
   * Whether the chip is removable or not. If true, a remove icon will be displayed.
   * If using this, you should add an aria-label as well, e.g "Slett {item}"
   * @attribute data-removable
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  dataRemovable = input<boolean>(false, { alias: 'data-removable' })
}
