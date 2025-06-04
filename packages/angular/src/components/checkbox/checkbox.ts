import { Component, inject, input, signal } from '@angular/core'
import { CheckboxDirective } from './checkbox-input.component'
import { Field } from '../field/field'
import { Label } from '../label/label'

let id = 0

@Component({
  standalone: true,
  selector: 'ksd-checkbox',
  imports: [CheckboxDirective, Field, Label],
  template: `
    <ksd-field>
      <input ksdCheckbox type="checkbox" [id]="id()" [value]="value()" [readOnly]="readOnly()" />
      <label ksdLabel [for]="id()">
        {{label()}}
      </label>
    </ksd-field>
  `,
})
export class Checkbox {
  private readonly _id = signal(`fiks-checkbox-${id++}`)
  protected id = this._id.asReadonly()

  
  label = input.required<string>()
  description = input<string>();
  disabled = input<boolean>(false);
  readOnly = input<boolean>(false);
  value = input<string | number | readonly string[]>()


  // dataSize = signal<DefaultProps>('')
  // dataColor
  // ariaLabel
  // error
  // ariaLabelledBy


  
}
