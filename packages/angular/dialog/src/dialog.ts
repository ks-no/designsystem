import { Directive, input } from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'dialog[ksd-dialog]',
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
    class: 'ds-dialog',
    '[attr.data-placement]': 'placement() || undefined',
    '[attr.closedby]': 'closedBy() || null',
  },
})
export class Dialog {
  /** Controls where the dialog appears relative to the viewport edge. Useful for drawer/side-panel variants. */
  readonly placement = input<'bottom' | 'top' | 'left' | 'right' | undefined>(
    undefined,
    { alias: 'data-placement' },
  )

  /**
   * Controls which interactions close the dialog.
   * - `any` — closes on backdrop click or Escape key
   * - `closerequest` — closes on Escape key only
   * - `none` — the dialog cannot be closed by the user without an explicit close button
   */
  readonly closedBy = input<'any' | 'closerequest' | 'none' | undefined>(
    undefined,
    { alias: 'closedby' },
  )
}
