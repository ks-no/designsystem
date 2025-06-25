import { booleanAttribute, Component, input, model } from '@angular/core'

@Component({
  selector: 'input[ksd-input], textarea[ksd-input]',
  host: {
    class: 'ds-input',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.readonly]': 'readonly() ? true : null',
    '(click)': 'onClick($event)',
  },
  template: ``,
})
export class Input {
  id = model<string>()
  ariaDescribedBy = model<string | undefined>(undefined, { alias: 'aria-describedby' })
  readonly = input(false, { transform: booleanAttribute })

  onClick(event: Event) {
    if (this.readonly()) {
      event.preventDefault()
    }
  }
}
