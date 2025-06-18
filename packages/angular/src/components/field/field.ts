import {
    afterNextRender,
    Component,
    contentChild,
    input,
    isDevMode,
    signal,
} from '@angular/core'
import { randomId } from '../../utils/random-id'
import { Checkbox } from '../checkbox/checkbox'
import { CommonInputs } from '../common-inputs'
import { Label } from '../label/label'

/**
 * Use the Field component to connect inputs and labels
 */
@Component({
    selector: 'ksd-field',
    hostDirectives: [
        {
            directive: CommonInputs,
            inputs: ['data-size', 'data-color'],
        },
    ],
    host: {
        class: 'ds-field',
        '[attr.dataPosition]': 'position()',
    },
    template: ` <ng-content /> `,
})
export class Field {
    /**
     * Position of toggle inputs (radio, checkbox, switch) in field
     * @default start
     */
    position = input<'start' | 'end'>('start')

    private input = contentChild(Checkbox)
    private label = contentChild(Label)
    private readonly id = signal(randomId())

    constructor() {
        afterNextRender(() => {
            if (isDevMode() && (!this.label() || !this.input())) {
                console.error(
                    '[Field] Missing required elements: ksd-label and ksd-input must be provided as children',
                )
            }

            this.input()?.id.set(this.id())
            this.label()?.for.set(this.id())
        })
    }
}
