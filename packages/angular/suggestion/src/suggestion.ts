import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import type {
  SuggestionFilter,
  SuggestionFilterArgs,
  SuggestionItem,
} from './suggestion.types'
import { nextSelected, sanitizeItems } from './suggestion.utils'

const defaultFilter = ({ label, input }: SuggestionFilterArgs) =>
  label.toLowerCase().includes(input.value.trim().toLowerCase())

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
      #suggestionElement
      class="ds-suggestion"
      [attr.data-multiple]="multiple() || undefined"
      [attr.data-creatable]="creatable() || undefined"
      (comboboxbeforeselect)="onSelect($event)"
      (input)="onInput($event)"
      (keydown)="onKeyDown($event)"
    >
      @for (option of selectedArray(); track option.value) {
        <data [attr.value]="option.value">{{ option.label }}</data>
      }
      <ng-content />
    </ds-suggestion>
  `,
})
export class Suggestion {
  /**
   * Allows the user to select multiple items
   *
   * @default false
   */
  multiple = input(false, { transform: booleanAttribute })

  /**
   * Allows the user to create new items
   *
   * @default false
   */
  creatable = input(false, { transform: booleanAttribute })

  /**
   * Filter options; boolean or a custom callback.
   *
   * @default true
   */
  filter = input<boolean | SuggestionFilter>(true)

  /**
   * Model for the selected item(s).
   *
   * @default undefined
   */
  selected = model<SuggestionItem | SuggestionItem[] | undefined>(undefined)

  protected selectedArray = computed(() => sanitizeItems(this.selected()))
  private readonly suggestionElement =
    viewChild<ElementRef<HTMLElement>>('suggestionElement')

  constructor() {
    afterNextRender(() => this.syncOptions(null))
  }

  protected onSelect(event: Event) {
    const customEvent = event as CustomEvent<HTMLDataElement | undefined>
    customEvent.preventDefault()

    const data = customEvent.detail
    if (!data) return

    this.selected.set(nextSelected(data, this.selected(), this.multiple()))
  }

  protected onKeyDown(event: Event) {
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key !== 'Escape') return

    event.preventDefault()
  }

  protected onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement | null
    setTimeout(() => this.syncOptions(inputElement))
  }

  private syncOptions(inputElement: HTMLInputElement | null) {
    const suggestionElement = this.suggestionElement()?.nativeElement
    if (!suggestionElement) return

    const input =
      inputElement ?? suggestionElement.querySelector<HTMLInputElement>('input')

    const options = Array.from(
      suggestionElement.querySelectorAll<HTMLOptionElement>(
        'u-option:not([data-empty])',
      ),
    )

    const filter = this.filter()
    const filterFn = filter === true ? defaultFilter : filter

    if (filterFn && input) {
      let index = 0
      for (const option of options) {
        option.disabled = !filterFn({
          index,
          input,
          label: option.label,
          optionElement: option,
          text: option.text,
          value: option.value,
        })
        index++
      }
    } else {
      for (const option of options) {
        option.disabled = false
      }
    }

    const visibleOptions = options.filter(
      (option) => !option.disabled && !option.hidden,
    )
    const emptyOption = suggestionElement.querySelector<HTMLOptionElement>(
      'u-option[data-empty]',
    )

    if (!emptyOption) return

    if (visibleOptions.length === 0) {
      emptyOption.removeAttribute('hidden')
      return
    }

    emptyOption.setAttribute('hidden', '')
  }
}
