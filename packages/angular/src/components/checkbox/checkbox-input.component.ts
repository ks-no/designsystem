
import {
  Component,
  input
} from '@angular/core'

@Component({
  standalone: true,
  selector: 'input[type="checkbox"][ksdCheckbox]',
  host: {
    type: 'checkbox',
    class: 'ds-input',
    '[attr.id]': 'id()',
  },
  template: ``,
})
export class CheckboxDirective {
  id = input<string>()
}
