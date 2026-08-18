import { NgTemplateOutlet } from '@angular/common'
import {
  afterRenderEffect,
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
  signal,
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
  SuggestionSelected,
  SuggestionSelectedInput,
  SuggestionValue,
} from './suggestion.types'
import type { SuggestionLabels } from './suggestion.utils'
import {
  labelEntries,
  nextSelected,
  resolveItems,
  sameValue,
  toSelected,
  toValue,
} from './suggestion.utils'

const defaultFilter = ({ label, input }: SuggestionFilterArgs) =>
  label.toLowerCase().includes(input.value.trim().toLowerCase())

// Distinguishes an unbound `selected` from one explicitly bound to `undefined`.
const UNSET = Symbol('unset')

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
   * Current value, as primitive option values. Bound by Angular signal forms.
   *
   * @default undefined
   */
  readonly value = model<SuggestionValue>(undefined)

  /**
   * Controlled selection. Accepts items or raw option values.
   *
   * @default undefined
   */
  readonly selected = input<SuggestionSelectedInput | typeof UNSET>(UNSET)

  /**
   * Emits the resolved selection whenever the user changes it.
   */
  readonly selectedChange = output<SuggestionSelected>()

  /**
   * Form-control dirty state.
   *
   * @default false
   */
  readonly dirty = input(false, { transform: booleanAttribute })

  /**
   * Whether the control has been touched. Synced with Angular signal forms.
   *
   * @default false
   */
  readonly touched = model(false)

  protected selectedArray = computed(() =>
    resolveItems(this.value(), this.labels()),
  )
  private readonly suggestionElement =
    viewChild<ElementRef<HTMLElement>>('suggestionElement')
  private readonly labels = signal<SuggestionLabels>(new Map())
  private readonly query = signal('')
  protected readonly suggestionList = contentChild(SuggestionList)

  constructor() {
    // Runs after render, so projected options are present in the DOM.
    afterRenderEffect(() => {
      this.query()
      this.filter()
      this.suggestionList()?.options()
      this.syncOptions()
    })

    // Apply the controlled `selected` input, when bound, to the value model.
    effect(() => {
      const selected = this.selected()
      if (selected === UNSET) return

      untracked(() => this.learnLabels(labelEntries(selected)))

      const next = toValue(selected)
      if (
        sameValue(
          next,
          untracked(() => this.value()),
        )
      )
        return

      untracked(() => this.value.set(next))
    })
  }

  protected onSelect(event: Event) {
    const customEvent = event as CustomEvent<HTMLDataElement | undefined>
    customEvent.preventDefault()

    const data = customEvent.detail
    if (!data) return

    this.learnLabels([[data.value, data.textContent?.trim() || data.value]])
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

    this.touched.set(true)
  }

  protected onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement | null
    this.query.set(inputElement?.value ?? '')
  }

  private setValue(value: SuggestionValue) {
    if (sameValue(value, this.value())) return

    this.value.set(value)
    this.selectedChange.emit(toSelected(value, this.labels()))
  }

  private learnLabels(entries: Iterable<readonly [string, string]>) {
    this.labels.update((current) => {
      let next: Map<string, string> | null = null

      for (const [value, label] of entries) {
        if (current.get(value) === label) continue

        next ??= new Map(current)
        next.set(value, label)
      }

      return next ?? current
    })
  }

  private syncOptions() {
    const suggestionElement = this.suggestionElement()?.nativeElement
    if (!suggestionElement) return

    const input = suggestionElement.querySelector<HTMLInputElement>('input')

    const options = Array.from(
      suggestionElement.querySelectorAll<HTMLOptionElement>(
        'u-option:not([data-empty])',
      ),
    )

    this.learnLabels(
      options.map((option) => [
        option.value,
        option.label ||
          option.text ||
          option.textContent?.trim() ||
          option.value,
      ]),
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
