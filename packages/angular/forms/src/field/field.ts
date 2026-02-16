import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

/**
 * Use the Field component to connect inputs and labels
 */
@Component({
  selector: 'ksd-field',
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
  template: `
    <ds-field class="ds-field" [attr.data-position]="position()">
      <ng-content />
    </ds-field>
  `,
  styles: `
    :host {
      display: grid;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Field {
  /**
   * Position of toggle inputs (radio, checkbox, switch) in field
   * @default start
   */
  position = input<'start' | 'end'>('start')
}
