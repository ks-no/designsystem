import { Component, contentChild, contentChildren, effect } from '@angular/core';
import { Input } from '../input/input';
import { ValidationMessage } from '../validation-message/validation-message';

@Component({
  selector: 'fieldset[ksd-fieldset]',
  host: {
    role: 'fieldset',
    class: 'ds-fieldset',
  },
  template: ` <ng-content /> `,
})
export class Fieldset {
  private validationMessage = contentChild(ValidationMessage)
  private inputs = contentChildren(Input, { descendants: true })

  constructor() {
    effect(() => {
      this.inputs().forEach((input) => {
        input.ariaDescribedBy.set(this.validationMessage()?.id())
      })
    })
  }
}
