import {
  afterNextRender,
  Component,
  contentChild,
  input,
  signal,
} from '@angular/core'
import { CheckboxDirective } from '../checkbox/checkbox-input.component'
import { Label } from '../label/label'

const randomFiveChars = () => {
  return Math.random().toString(36).substr(2, 5)
}
@Component({
  selector: 'ksd-field',
  host: {
    class: 'ds-field',
  },
  template: ` <ng-content /> `,
  //   styles: `:host {display:block;}`
})
export class Field {
  position = input<'start' | 'end'>('start')

  private input = contentChild(CheckboxDirective)
  private label = contentChild(Label)
  private readonly id = signal(randomFiveChars())

  constructor() {
    afterNextRender(() => {
      if (this.label() && this.input()) {
        this.input()?.id.set(this.id())
        this.label()?.for.set(this.id())
      }
    })
  }
}
