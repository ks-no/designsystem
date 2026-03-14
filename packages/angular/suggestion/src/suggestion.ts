import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  model,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

export type SuggestionItem = { label: string; value: string }

type SuggestionModelValue = SuggestionItem | SuggestionItem[] | null | undefined

const sanitizeItems = (values: SuggestionModelValue): SuggestionItem[] =>
  !values ? [] : Array.isArray(values) ? values : [values]

const toItem = (data: HTMLDataElement): SuggestionItem => ({
  label: data.textContent?.trim() || data.value,
  value: data.value,
})

const nextSelected = (
  data: HTMLDataElement,
  previous: SuggestionModelValue,
  multiple: boolean,
): SuggestionItem | SuggestionItem[] | null => {
  const item = toItem(data)

  if (!multiple) {
    return data.isConnected ? null : item
  }

  const prevItems = sanitizeItems(previous)
  return data.isConnected
    ? prevItems.filter(({ value }) => value !== item.value)
    : [...prevItems, item]
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

  selected = model<SuggestionItem | SuggestionItem[] | null>(null)

  protected selectedArray = computed(() => sanitizeItems(this.selected()))

  onSelect(event: Event) {
    const customEvent = event as CustomEvent<HTMLDataElement | undefined>
    customEvent.preventDefault()

    const data = customEvent.detail
    if (!data) return

    this.selected.set(nextSelected(data, this.selected(), this.multiple()))
  }
}

@Component({
  selector: 'ksd-suggestion-list-option',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
  template: ` <ng-template #tpl><ng-content /></ng-template> `,
})
export class SuggestionListOption {
  /**
   * Hack to get the content of the tab from outside so that we can
   * keep the dom structure needed without additional host elements
   */
  templateRef = viewChild<TemplateRef<unknown>>('tpl')

  value = input<string>()
}

@Component({
  selector: 'ksd-suggestion-list',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  host: {},
  template: `
    <u-datalist>
      @for (option of options(); track option) {
        <u-option [value]="option.value()">
          <ng-container *ngTemplateOutlet="option.templateRef()" />
        </u-option>
      }
    </u-datalist>
  `,
})
export class SuggestionList {
  readonly options = contentChildren(SuggestionListOption, {
    descendants: true,
  })
}
