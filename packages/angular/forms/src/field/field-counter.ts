import { Component, computed, effect, inject, input } from '@angular/core'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'
import { FieldState } from './field-state'

@Component({
  selector: 'ksd-field-counter',
  imports: [ValidationMessage],
  template: `
    <div data-field="description" class="ds-sr-only" aria-live="polite">
      @if (hasExceededLimit()) {
        {{ excessCount() }} tegn for mye
      }
    </div>
    @if (hasExceededLimit()) {
      <p ksd-validation-message>{{ excessCount() }} tegn for mye</p>
    } @else {
      <p data-field="validation">{{ remainder() }} tegn igjen</p>
    }
  `,

  /**
   * Apply custom styles here to get correct spacing because
   * the rendered host element from Angular is getting in the way
   */
  styles: `
    :host > * {
      margin-top: var(--dsc-field-content-spacing);
    }
  `,
})
export class FieldCounter {
  /**
   * The maximum allowed characters.
   *
   **/
  readonly limit = input.required<number>()

  /**
   * How many characters have been typed.
   *
   **/
  readonly count = input.required<number>()
  protected readonly remainder = computed(() => this.limit() - this.count())
  protected readonly excessCount = computed(() => Math.abs(this.remainder()))
  protected readonly hasExceededLimit = computed(
    () => this.count() > this.limit(),
  )

  private fieldState = inject(FieldState)

  constructor() {
    effect(() => {
      this.fieldState.hasExceededCounter.set(this.hasExceededLimit())
    })
  }
}
