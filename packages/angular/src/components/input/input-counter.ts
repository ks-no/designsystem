import { Component, computed, input, signal } from '@angular/core';
import { ValidationMessage } from '../validation-message';

@Component({
  selector: 'ksd-input-counter',
  imports: [ValidationMessage],
  host: {
    '[attr.id]': 'id()',
  },
  template: `
  <div data-field="description" class="ds-sr-only" aria-live="polite">
    {{ hasExceededLimit() ? 'Du har overskredet grensen' : 'Du har ikke overskredet grensen' }}
  </div>
  @if(hasExceededLimit()) {
    <p ksd-validation-message>{{ label() }}</p>
  }
  `,
})
export class InputCounter {
  limit = input.required<number>()
  count = signal(2);
  hasExceededLimit = computed(() => this.count() > this.limit());
  overOrUnder = computed(() => this.count() > this.limit() ? 'over' : 'under')
  label = computed(() => this.overOrUnder().replace('%d', Math.abs(this.count()).toString()))


}
