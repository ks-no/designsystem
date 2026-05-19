import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core'
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    <ds-field
      class="ds-field"
      [attr.data-position]="dataPosition() ?? position() ?? 'start'"
      [attr.data-variant]="dataVariant()"
    >
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
   * Preferred position input for toggle inputs (radio, checkbox, switch) in field.
   * @default start
   */
  dataPosition = input<'start' | 'end' | undefined>(undefined, {
    alias: 'data-position',
  })

  /**
   * Legacy position input kept for backward compatibility.
   * @deprecated Use data-position instead.
   * @default start
   */
  position = input<'start' | 'end' | undefined>(undefined)

  /**
   * Variant forwarded to ds-field.
   */
  dataVariant = input<'outline' | undefined>(undefined, {
    alias: 'data-variant',
  })
}
