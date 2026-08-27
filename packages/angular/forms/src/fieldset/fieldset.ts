import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import '@digdir/designsystemet-web'

@Component({
  selector: 'fieldset[ksd-fieldset]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-fieldset',
  },
  template: ` <ng-content /> `,
  styles: `
    :host > ::ng-deep ksd-field + ksd-field {
      margin-block-start: var(--ds-size-4);
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Fieldset {}
