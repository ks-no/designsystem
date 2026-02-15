import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-breadcrumbs',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ds-breadcrumbs
      class="ds-breadcrumbs"
      [attr.aria-label]="ariaLabel()"
      role="navigation"
    >
      <ng-content />
    </ds-breadcrumbs>
  `,
  host: {
    '[attr.aria-label]': 'null',
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
export class Breadcrumbs {
  /**
   * Sets the screen reader label for the pagination
   */
  readonly ariaLabel = input<string>('Du er her:', { alias: 'aria-label' })
}
