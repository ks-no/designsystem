import { Component, inject, input, signal } from '@angular/core'
import { NgxControlValueAccessor } from 'ngxtension/control-value-accessor'
import {
  KsCheckboxInputComponent,
  KsCheckboxLabelComponent,
} from './checkbox-input'

let id = 0

// About validation
// Required is a bit odd for checkboxes, it only checks for !undefined. So checking the box once then checking it again
// will fill the requirements for required.
// Validators.requiredTrue makes more sense, but it does not exist as a ready validator for templatedriven usage.

@Component({
  standalone: true,
  selector: 'fiks-checkbox-input',
  styles: `
    :host {
      display: block;
    }
  `,
  hostDirectives: [NgxControlValueAccessor],
  template: `
    <div class="ds-field">
      <input
        type="checkbox"
        ksCheckboxInput
        [id]="id()"
        [isChecked]="isChecked()"
        [isError]="false"
        [name]="name()"
        (blured)="onBlur()"
        (clicked)="onClick($event)"
      />

      <label [for]="id()">
        <ks-checkbox-label>
          <ng-content />
        </ks-checkbox-label>
      </label>
    </div>
  `,
  imports: [KsCheckboxInputComponent, KsCheckboxLabelComponent],
})
export class FiksCheckboxInputComponent {
  private readonly _id = signal(`fiks-checkbox-${id++}`)
  private readonly cva = inject(NgxControlValueAccessor)

  isChecked = input<boolean>(false)
  name = input<string>()

  protected id = this._id.asReadonly()

  protected onClick(event: { isChecked: boolean }) {
    this.cva.writeValue(event.isChecked)
  }

  protected onBlur() {
    this.cva.markAsTouched()
  }
}
