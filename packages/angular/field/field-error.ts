import { Component } from '@angular/core'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'

@Component({
  selector: '[ksd-error]',
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: ValidationMessage,
    },
  ],
})
export class FieldError {}
