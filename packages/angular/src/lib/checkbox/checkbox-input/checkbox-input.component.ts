import { NgClass } from '@angular/common'

import {
  Component,
  ElementRef,
  input,
  output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core'

@Component({
  standalone: true,
  selector: 'input[type="checkbox"][ksCheckboxInput]',
  host: {
    type: 'checkbox',
    class: 'ds-input',
    '[attr.id]': 'id()',
    '[attr.name]': 'name()',
    '[attr.checked]': 'isChecked()',
    '(change)': 'onClick($event)',
    '(blur)': 'onBlur()',
  },
  template: ``,
})
export class KsCheckboxInputComponent {
  id = input<string>()
  name = input<string>()
  isChecked = input<boolean>(false)
  isError = input<boolean>(false)

  blured = output()
  clicked = output<{ isChecked: boolean }>()

  constructor() {
    console.log('KsCheckboxInputComponent', this.id())
  }

  protected readonly inputRef = viewChild<ElementRef>('inputRef')

  protected onClick(event: Event) {
    const checkboxElement = event.target as HTMLInputElement
    const isChecked = checkboxElement.checked

    this.clicked.emit({ isChecked })
  }

  protected onBlur() {
    this.blured.emit()
  }
}
