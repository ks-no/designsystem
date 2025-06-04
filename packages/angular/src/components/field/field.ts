import {
    Component,
    input
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
    //   styles: `:host {display:block;}`
})
export class Field {
    position = input<'start' | 'end'>('start')
}
