import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute,
  Component,
  computed,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  model,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

export type SuggestionItem = { label: string; value: string }

type SuggestionSelected =
  | string
  | SuggestionItem
  | Array<string | SuggestionItem>

const sanitizeItems = (values: SuggestionSelected = []): SuggestionItem[] =>
  typeof values === 'string'
    ? [{ label: values, value: values }]
    : !Array.isArray(values)
      ? [values]
      : values.map((value) =>
          typeof value === 'string' ? { label: value, value } : value,
        )

@Component({
  selector: 'ksd-suggestion',
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
      @for (option of selectedArray(); track option) {
        <data [attr.key]="option.value" [attr.value]="option.value">{{
          option.label
        }}</data>
      }
      <ng-content />
    </ds-suggestion>
  `,
})
export class Suggestion {
  selectedChange = output<SuggestionItem>()
  multiple = input(false, { transform: booleanAttribute })
  creatable = input(false, { transform: booleanAttribute })

  selected = model<SuggestionItem | SuggestionItem[] | undefined>(undefined)

  protected selectedArray = computed(() => sanitizeItems(this.selected()))
  onSelect(event: any) {
    event.preventDefault()
    const data = event.detail
    const label = data.textContent
    const value = data.value
    this.selected.set(
      this.multiple()
        ? [...((this.selected() as SuggestionItem[]) || []), { label, value }]
        : { label, value },
    )
    this.selectedChange.emit({ label, value })
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
