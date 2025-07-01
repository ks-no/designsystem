import {
  afterNextRender,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { CommonInputs } from '../common-inputs'
import { Input } from '../input/input'
import { Label } from '../label/label'
import { FieldCounter } from './field-counter'
import { fieldObserver } from './field-observer'

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
  template: `
    <ng-content />
    @if (hasCounter()) {
      <ksd-field-counter [limit]="limit() ?? 0" [count]="count() ?? 0" />
    }
  `,
  imports: [FieldCounter],
})
export class Field {
  /**
   * Position of toggle inputs (radio, checkbox, switch) in field
   * @default start
   */
  position = input<'start' | 'end'>('start')

  private input = contentChild(Input)
  private label = contentChild(Label)

  private el = inject(ElementRef)
  protected count = computed(() => this.input()?.value().length)
  protected limit = computed(() => this.input()?.counter())
  protected hasCounter = computed(() => this.limit())

  constructor() {
    afterNextRender(() => {
      if (!this.label() || !this.input()) {
        logIfDevMode({
          component: 'Field',
          message:
            'Missing required elements: ksd-label and ksd-input must be provided as children. Check imports and markup.',
        })
      }

      fieldObserver(this.el.nativeElement)
    })
  }
}
