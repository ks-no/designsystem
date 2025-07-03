import {
  afterNextRender,
  Component,
  computed,
  contentChild,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { CommonInputs } from '../common-inputs'
import { Input } from '../input/input'
import { Label } from '../label/label'
import { ValidationMessage } from '../validation-message'
import { FieldCounter } from './field-counter'
import { fieldObserver } from './field-observer'
import { FieldState } from './field-state'

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
  providers: [FieldState],
})
export class Field {
  /**
   * Position of toggle inputs (radio, checkbox, switch) in field
   * @default start
   */
  position = input<'start' | 'end'>('start')

  private readonly fieldState = inject(FieldState)
  private readonly input = contentChild(Input)
  private readonly label = contentChild(Label)
  private readonly projectedErrors = contentChildren(ValidationMessage)

  private readonly el = inject(ElementRef)
  protected readonly count = computed(() => this.input()?.value().length)
  protected readonly limit = computed(() => this.input()?.counter())
  protected readonly hasCounter = computed(() => this.limit())

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

    effect(() => {
      this.fieldState.hasProjectedErrors.set(this.projectedErrors().length > 0)
    })
  }
}
