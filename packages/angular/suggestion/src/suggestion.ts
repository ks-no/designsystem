import { NgTemplateOutlet } from '@angular/common'
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  input,
  model,
  output,
  untracked,
  viewChild,
} from '@angular/core'
import type { FormValueControl } from '@angular/forms/signals'
import '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import { SuggestionList } from './suggestion-list'
import type {
  SuggestionFilter,
  SuggestionFilterArgs,
  SuggestionModelValue,
  SuggestionValue,
} from './suggestion.types'
import { nextSelected, sanitizeItems } from './suggestion.utils'

const defaultFilter = ({ label, input }: SuggestionFilterArgs) =>
  label.toLowerCase().includes(input.value.trim().toLowerCase())

const unboundSelected = Symbol('unboundSelected')

const normalizeValue = (value: SuggestionModelValue): SuggestionValue =>
  value ?? undefined

const sameItems = (left: SuggestionValue, right: SuggestionValue) => {
  const leftItems = sanitizeItems(left)
  const rightItems = sanitizeItems(right)

  return (
    leftItems.length === rightItems.length &&
    leftItems.every(
      (item, index) =>
        item.label === rightItems[index]?.label &&
        item.value === rightItems[index]?.value,
    )
  )
}

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
  imports: [NgTemplateOutlet],
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <ds-suggestion
      #suggestionElement
      class="ds-suggestion"
      [attr.data-multiple]="multiple() || undefined"
      [attr.data-creatable]="creatable() || undefined"
      (comboboxbeforeselect)="onSelect($event)"
      (focusout)="onFocusOut($event)"
      (input)="onInput($event)"
      (keydown)="onKeyDown($event)"
    >
      @for (option of selectedArray(); track option.value) {
        <data [attr.value]="option.value">{{ option.label }}</data>
      }
      <ng-content />
      <u-datalist
        popover="manual"
        data-is-floating="true"
        data-nofilter
        [attr.data-sr-singular]="suggestionList()?.singular()"
        [attr.data-sr-plural]="suggestionList()?.plural()"
      >
        @for (option of suggestionList()?.options() ?? []; track option) {
          <u-option [value]="option.value()">
            <ng-container *ngTemplateOutlet="option.templateRef()" />
          </u-option>
        }
        @if (suggestionList()?.empty()?.templateRef(); as emptyTpl) {
          <u-option data-empty value="" hidden>
            <ng-container *ngTemplateOutlet="emptyTpl" />
          </u-option>
        }
      </u-datalist>
    </ds-suggestion>
  `,
})
export class Suggestion implements FormValueControl<SuggestionValue> {
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
   * Internal value model used by Angular signal forms.
   *
   * @default undefined
   */
  readonly value = model<SuggestionValue>(undefined)

  /**
   * Controlled selected value for direct component usage.
   *
   * @default undefined
   */
  readonly selected = input<SuggestionModelValue | typeof unboundSelected>(
    unboundSelected,
  )

  /**
   * Emits when the controlled selected value changes.
   */
  readonly selectedChange = output<SuggestionValue>()

  /**
   * Form-control dirty state.
   *
   * @default false
   */
  readonly dirty = input(false, { transform: booleanAttribute })

  /**
   * Emits when the control should be marked as touched.
   */
  readonly touch = output<void>()

  protected selectedArray = computed(() => sanitizeItems(this.value()))
  private readonly suggestionElement =
    viewChild<ElementRef<HTMLElement>>('suggestionElement')
  protected readonly suggestionList = contentChild(SuggestionList)

  constructor() {
    afterNextRender(() => this.syncOptions(null))

    // Keep the internal form-control model in sync when selected is used as the
    // direct controlled API instead of formField.
    effect(() => {
      const selected = this.selected()

      if (selected === unboundSelected) return
      const normalizedValue = normalizeValue(selected)
      if (
        sameItems(
          normalizedValue,
          untracked(() => this.value()),
        )
      )
        return

      this.setValue(normalizedValue, false)
    })

    // Re-run option filtering after projected suggestion options change.
    effect(() => {
      this.suggestionList()?.options()
      queueMicrotask(() => this.syncOptions(null))
    })
  }

  protected onSelect(event: Event) {
    const customEvent = event as CustomEvent<HTMLDataElement | undefined>
    customEvent.preventDefault()

    const data = customEvent.detail
    if (!data) return

    this.setValue(nextSelected(data, this.value(), this.multiple()))
  }

  protected onKeyDown(event: Event) {
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key !== 'Escape') return

    event.preventDefault()
  }

  protected onFocusOut(event: FocusEvent) {
    const suggestionElement = this.suggestionElement()?.nativeElement
    const nextTarget = event.relatedTarget

    // Ignore focus changes within the composite widget; only mark touched
    // when focus leaves the suggestion control entirely.
    if (
      suggestionElement &&
      nextTarget instanceof Node &&
      suggestionElement.contains(nextTarget)
    ) {
      return
    }

    this.touch.emit()
  }

  protected onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement | null
    setTimeout(() => this.syncOptions(inputElement))
  }

  private setValue(value: SuggestionValue, emitSelectedChange = true) {
    if (sameItems(value, this.value())) return

    this.value.set(value)

    if (emitSelectedChange) {
      this.selectedChange.emit(value)
    }
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
