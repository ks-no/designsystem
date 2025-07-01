import { Component, contentChild, contentChildren, effect } from '@angular/core'
import { Checkbox } from '../checkbox/checkbox'
import { ValidationMessage } from '../validation-message/validation-message'

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
  private checkboxes = contentChildren(Checkbox, { descendants: true })

  constructor() {
    effect(() => {
      this.checkboxes().forEach((checkbox) => {
        checkbox.ariaDescribedBy.set(this.validationMessage()?.id())
      })
    })
  }
}
