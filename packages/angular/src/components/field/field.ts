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
  selector: 'ksd-field',
  host: {
    class: 'ds-field',
  },
  template: `
    <ng-content />
  `,
})
export class Field {
  position = input<'start' | 'end'>('start')
}
