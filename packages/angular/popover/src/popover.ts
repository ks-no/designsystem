import { booleanAttribute, Directive, input } from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ksd-popover]',
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
    class: 'ds-popover',
    '[attr.data-variant]': 'variant()',
    '[attr.data-placement]': 'placement()',
    '[attr.data-autoplacement]': 'autoPlacement()',
    '[attr.popover]': 'popover()',
  },
})
export class Popover {
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

  readonly popover = input<'auto' | 'manual'>('auto', { alias: 'popover' })
}
