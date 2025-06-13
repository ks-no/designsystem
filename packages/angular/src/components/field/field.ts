import {
    afterNextRender,
    Component,
    contentChild,
    input,
    signal,
} from '@angular/core'
import { randomId } from '../../utils/random-id'
import { Checkbox } from '../checkbox/checkbox'
import { Label } from '../label/label'


/**
 * Use the Field component to connect inputs and labels
 */
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
    private readonly id = signal(randomId())

    constructor() {
        afterNextRender(() => {
            if (this.label() && this.input()) {
                this.input()?.id.set(this.id())
                this.label()?.for.set(this.id())
            }
        })
    }
}
