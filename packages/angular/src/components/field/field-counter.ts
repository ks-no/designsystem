import { Component, computed, input } from '@angular/core'
import { ValidationMessage } from '../validation-message'

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
  limit = input.required<number>()

  /**
   * How many characters have been typed.
   *
   **/
  count = input.required<number>()
  remainder = computed(() => this.limit() - this.count())
  excessCount = computed(() => Math.abs(this.remainder()))
  hasExceededLimit = computed(() => this.count() > this.limit())
}
