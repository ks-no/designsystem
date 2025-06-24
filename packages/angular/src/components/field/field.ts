import {
    afterNextRender,
    Component,
    contentChild,
    input,
    signal
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { randomId } from '../../utils/random-id'
import { CheckboxDescription } from '../checkbox/checkbox-description'
import { CommonInputs } from '../common-inputs'
import { Input } from '../input/input'
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

    private input = contentChild(Input)
    private description = contentChild(CheckboxDescription)
    private label = contentChild(Label)
    private readonly id = signal(randomId())

    constructor() {
        afterNextRender(() => {
            if (!this.label() || !this.input()) {
                logIfDevMode({
                    component: 'Field',
                    message:
                        'Missing required elements: ksd-label and ksd-input must be provided as children. Check imports and markup.',
                })
            }

            this.input()?.id.set(this.id())
            this.label()?.for.set(this.id())

            if (this.description()) {
                const descriptionId = this.description()?.id()
                const existingAriaDescribedBy = this.input()?.ariaDescribedBy()
                this.input()?.ariaDescribedBy.set(
                    existingAriaDescribedBy
                        ? `${existingAriaDescribedBy} ${descriptionId}`
                        : descriptionId
                )
            }
        })
    }
}
