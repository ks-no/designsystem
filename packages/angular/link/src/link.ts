import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'a[ksd-link]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content /> `,
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
    class: 'ds-link',
  },
  styles: `
    :host {
      &:has(> span) > :is(ng-icon) {
        margin-inline: var(--ds-size-1);
        margin-inline-start: 0;
      }
      ng-icon {
        display: inline-flex;
        vertical-align: middle;
        font-size: var(--ng-icon-size, 1.3em);
      }
      svg {
        width: 1em;
        height: 1em;
      }
    }
  `,
})
export class Link {}
