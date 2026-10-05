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
    /* Transcluded icons need ::ng-deep: they carry the consumer's scoping attribute */
    :host:has(> span) > ::ng-deep :is(ng-icon, svg) {
      margin-inline: var(--ds-size-1);
      margin-inline-start: 0;
    }

    :host ::ng-deep ng-icon,
    :host > ::ng-deep svg {
      display: inline-flex;
      vertical-align: middle;
      font-size: var(--ng-glyph__size, 1.3em);
    }

    :host ::ng-deep svg {
      width: 1em;
      height: 1em;
    }
  `,
})
export class Link {}
