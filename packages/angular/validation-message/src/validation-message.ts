import { Directive } from '@angular/core'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ksd-validation-message]',
  host: {
    class: 'ds-validation-message',
    'data-field': 'validation',
  },
})
export class ValidationMessage {}
