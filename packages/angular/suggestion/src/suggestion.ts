import { NgTemplateOutlet } from '@angular/common'
import {
  Component,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

export type SuggestionItem = { label: string; value: string }

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
  imports: [],
  host: {},
  template: `
    <ds-suggestion
      class="ds-suggestion"
      (comboboxbeforeselect)="onSelect($event)"
    >
      <ng-content />
    </ds-suggestion>
  `,
})
export class Suggestion {
  selectedChange = output<SuggestionItem>()

  onSelect(event: any) {
    event.preventDefault()
    const data = event.detail
    const label = data.textContent
    const value = data.value
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
