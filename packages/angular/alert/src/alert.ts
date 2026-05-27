import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  HostSeverityColors,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

/**
 * Alerts are used to inform users about important information, warnings, errors, or success.
 */
@Component({
  selector: 'ksd-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content />`,
  host: {
    class: 'ds-alert',
  },
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
export class Alert {}
