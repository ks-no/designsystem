import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: '[ksd-breadcrumbs]',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ds-breadcrumbs class="ds-breadcrumbs">
      <ng-content />
    </ds-breadcrumbs>
  `,
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
export class Breadcrumbs {}
