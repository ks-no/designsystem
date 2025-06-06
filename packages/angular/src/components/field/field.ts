import {
    afterNextRender,
    Component,
    contentChild,
    input,
    signal,
} from '@angular/core'
import { Checkbox } from '../checkbox/checkbox'
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
})
export class Field {
    position = input<'start' | 'end'>('start')

    private input = contentChild(Checkbox)
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
