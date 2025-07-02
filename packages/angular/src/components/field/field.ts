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
  viewChildren,
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { CommonInputs } from '../common-inputs'
import { Input } from '../input/input'
import { Label } from '../label/label'
import { ValidationMessage } from '../validation-message'
import { FieldDescription } from './field-description'
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
      <div ksd-field-description class="ds-sr-only" aria-live="polite">
        @if (hasExceededLimit()) {
          {{ excessCount() }} tegn for mye
        }
      </div>
      @if (hasExceededLimit()) {
        <p ksd-validation-message>{{ excessCount() }} tegn for mye</p>
      } @else {
        <p data-field="validation">{{ remainder() }} tegn igjen</p>
      }
    }
  `,
  imports: [FieldDescription, ValidationMessage],
})
export class Field {
  /**
   * Position of toggle inputs (radio, checkbox, switch) in field
   * @default start
   */
  position = input<'start' | 'end'>('start')

  private el = inject(ElementRef)
  private input = contentChild(Input)
  private label = contentChild(Label)

  private readonly projectedErrors = contentChildren(ValidationMessage)
  private readonly internalErrors = viewChildren(ValidationMessage)
  protected hasError = computed(
    () => this.projectedErrors().length || this.internalErrors().length,
  )

  protected readonly count = computed(() => this.input()?.value().length ?? 0)
  protected readonly limit = computed(() => this.input()?.counter() ?? 0)
  protected readonly hasCounter = computed(() => this.limit())
  protected readonly remainder = computed(() => this.limit() - this.count())
  protected readonly excessCount = computed(() => Math.abs(this.remainder()))
  protected readonly hasExceededLimit = computed(
    () => this.count() > this.limit(),
  )

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
      if (this.hasError()) {
        this.input()?.invalid.set(true)
      }
    })
  }
}
