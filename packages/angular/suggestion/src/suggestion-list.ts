import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import { SuggestionListOption } from './suggestion-list-option'

@Component({
  selector: 'ksd-suggestion-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
  host: {
    style: 'display: contents;',
  },
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
