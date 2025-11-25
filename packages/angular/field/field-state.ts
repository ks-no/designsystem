import { computed, Injectable, signal } from '@angular/core'

@Injectable()
export class FieldState {
  /**
   * Whether the field counter has exceeded its limit
   */
  hasExceededCounter = signal(false)

  /**
   * Whether the field has errors projected from the outside
   */
  hasProjectedErrors = signal(false)

  /**
   * Whether the field has any errors associated with it
   */
  hasError = computed(
    () => this.hasExceededCounter() || this.hasProjectedErrors(),
  )
}
