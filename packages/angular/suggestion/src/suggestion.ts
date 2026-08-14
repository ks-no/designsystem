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
  SuggestionItem,
} from './suggestion.types'
import { nextSelected, sanitizeItems } from './suggestion.utils'

const defaultFilter = ({ label, input }: SuggestionFilterArgs) =>
  label.toLowerCase().includes(input.value.trim().toLowerCase())

type SuggestionValue = SuggestionItem | SuggestionItem[] | undefined
type SuggestionCompatValue =
  | SuggestionItem
  | SuggestionItem[]
  | null
  | undefined

const unboundSelected = Symbol('unboundSelected')
const unboundFormValue = Symbol('unboundFormValue')

const normalizeValue = (value: SuggestionCompatValue): SuggestionValue =>
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
   * Model for the selected item(s).
   *
   * @default undefined
   */
  readonly value = model<SuggestionValue>(undefined)

  /**
   * Compatibility input for signal-form style examples.
   */
  readonly formValue = input<SuggestionCompatValue | typeof unboundFormValue>(
    unboundFormValue,
  )

  /**
   * Compatibility output for signal-form style examples.
   */
  readonly formValueChange = output<SuggestionValue>()

  /**
   * Backwards compatible input for the selected item(s).
   *
   * @default undefined
   */
  readonly selected = input<SuggestionCompatValue | typeof unboundSelected>(
    unboundSelected,
  )

  /**
   * Backwards compatible output for the selected item(s).
   */
  readonly selectedChange = output<SuggestionValue>()

  readonly dirty = input(false, { transform: booleanAttribute })

  readonly touch = output<void>()

  protected selectedArray = computed(() => sanitizeItems(this.value()))
  private readonly suggestionElement =
    viewChild<ElementRef<HTMLElement>>('suggestionElement')
  protected readonly suggestionList = contentChild(SuggestionList)

  constructor() {
    afterNextRender(() => this.syncOptions(null))

    effect(() => {
      const formValue = this.formValue()

      if (formValue === unboundFormValue) return

      const normalizedValue = normalizeValue(formValue)
      if (
        sameItems(
          normalizedValue,
          untracked(() => this.value()),
        )
      )
        return

      this.setValue(normalizedValue, false, false)
    })

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

      this.setValue(normalizedValue, false, false)
    })

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

  focus(options?: FocusOptions) {
    this.findInput()?.focus(options)
  }

  reset() {
    const inputElement = this.findInput()

    if (inputElement) {
      inputElement.value = ''
    }

    this.setValue(undefined)
    this.syncOptions(inputElement)
  }

  private setValue(
    value: SuggestionValue,
    emitSelectedChange = true,
    emitFormValueChange = true,
  ) {
    if (sameItems(value, this.value())) return

    this.value.set(value)

    if (emitSelectedChange) {
      this.selectedChange.emit(value)
    }

    if (emitFormValueChange) {
      this.formValueChange.emit(value)
    }
  }

  private findInput() {
    return (
      this.suggestionElement()?.nativeElement.querySelector<HTMLInputElement>(
        'input',
      ) ?? null
    )
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
