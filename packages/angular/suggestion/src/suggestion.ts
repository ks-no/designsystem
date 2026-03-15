import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  model,
} from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import type { SuggestionItem } from './suggestion.types'
import { nextSelected, sanitizeItems } from './suggestion.utils'

@Component({
  selector: 'ksd-suggestion',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {},
  template: `
    <ds-suggestion
      class="ds-suggestion"
      [attr.data-multiple]="multiple() || undefined"
      [attr.data-creatable]="creatable() || undefined"
      (comboboxbeforeselect)="onSelect($event)"
    >
      @for (option of selectedArray(); track option.value) {
        <data [attr.value]="option.value">{{ option.label }}</data>
      }
      <ng-content />
    </ds-suggestion>
  `,
})
export class Suggestion {
  multiple = input(false, { transform: booleanAttribute })
  creatable = input(false, { transform: booleanAttribute })

  selected = model<SuggestionItem | SuggestionItem[] | undefined>(undefined)

  protected selectedArray = computed(() => sanitizeItems(this.selected()))

  protected onSelect(event: Event) {
    const customEvent = event as CustomEvent<HTMLDataElement | undefined>
    customEvent.preventDefault()

    const data = customEvent.detail
    if (!data) return

    this.selected.set(nextSelected(data, this.selected(), this.multiple()))
  }
}
