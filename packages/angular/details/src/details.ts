import { Directive, input } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'details[ksd-details]',
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
    class: 'ds-details',
    '[attr.data-variant]': 'dataVariant()',
  },
})
export class Details {
  readonly dataVariant = input<'default' | 'tinted'>('default', {
    alias: 'data-variant',
  })
}
