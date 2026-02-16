import { booleanAttribute, Component, input } from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-popover',
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
    <div
      popover="manual"
      class="ds-popover"
      data-testid="popover"
      [id]="popoverId()"
      [attr.data-variant]="variant()"
      [attr.data-placement]="placement()"
      [attr.data-autoplacement]="autoPlacement()"
    >
      <ng-content />
    </div>
  `,
})
export class Popover {
  readonly popoverId = input.required<string>()
  readonly autoPlacement = input(true, { transform: booleanAttribute })
  readonly variant = input<'tinted' | 'default'>('default', {
    alias: 'data-variant',
  })

  // Todo: replace with centralized types
  readonly placement = input<
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left'
    | 'left-end'
    | 'left-start'
    | 'right'
    | 'right-end'
    | 'right-start'
    | 'top'
    | 'top-end'
    | 'top-start'
  >('top', { alias: 'data-placement' })
}
