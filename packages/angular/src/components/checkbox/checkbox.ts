import { Component, input, signal } from '@angular/core'
import { Field } from '../field/field'
import { Label } from '../label/label'
import { CheckboxDirective } from './checkbox-input.component'

let id = 0

@Component({
  selector: 'ksd-checkbox',
  imports: [CheckboxDirective, Field, Label],
  template: `
    <ksd-field>
      <input
        ksdCheckbox
        type="checkbox"
        [id]="id()"
        [value]="value()"
        [readOnly]="readOnly()"
      />
      <label ksdLabel [for]="id()">
        {{ label() }}
      </label>
    </ksd-field>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class Checkbox {
  private readonly _id = signal(`fiks-checkbox-${id++}`)
  protected id = this._id.asReadonly()

  label = input.required<string>()
  description = input<string>()
  disabled = input<boolean>(false)
  readOnly = input<boolean>(false)
  value = input<string | number | readonly string[]>()

  // dataSize = signal<DefaultProps>('')
  // dataColor
  // ariaLabel
  // error
  // ariaLabelledBy
}
