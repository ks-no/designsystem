import '@digdir/designsystemet-web';
import {
  Component,
  computed,
  contentChild,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'
import { Input } from '../input'
import { FieldCounter } from './field-counter'
import { FieldState } from './field-state'

/**
 * Use the Field component to connect inputs and labels
 */
@Component({
  selector: 'ksd-field',
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  host: {
    '[attr.dataPosition]': 'position()',
  },
  template: `
  <ds-field class="ds-field">
    <ng-content />
    @if (hasCounter()) {
      <ksd-field-counter [limit]="limit() ?? 0" [count]="count() ?? 0" />
    }
  </ds-field>
  `,
  imports: [FieldCounter],
  providers: [FieldState],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Field {
  /**
   * Position of toggle inputs (radio, checkbox, switch) in field
   * @default start
   */
  position = input<'start' | 'end'>('start')

  private readonly fieldState = inject(FieldState)
  private readonly input = contentChild(forwardRef(() => Input))
  private readonly projectedErrors = contentChildren(ValidationMessage)

  protected readonly count = computed(() => this.input()?.value().length)
  protected readonly limit = computed(() => this.input()?.counter())
  protected readonly hasCounter = computed(() => this.limit())

  constructor() {
    effect(() => {
      this.fieldState.hasProjectedErrors.set(this.projectedErrors().length > 0)
    })
  }
}
