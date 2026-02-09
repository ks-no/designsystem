import { Component, input } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-tag',
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
  host: {
    class: 'ds-tag',
    '[attr.data-variant]': 'variant()',
  },
  styles: `
    :host ::ng-deep > * {
      margin-inline-end: var(--ds-size-1);
    }
  `,
  template: ` <ng-content /> `,
})
export class Tag {
  /**
   * The visual variant of the tag
   *
   * @default 'default'
   */
  readonly variant = input<'default' | 'outline'>('default', {
    alias: 'data-variant',
  })
}
