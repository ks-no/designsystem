import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
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
    <u-datalist
      [attr.data-sr-singular]="singular()"
      [attr.data-sr-plural]="plural()"
    >
      @for (option of options(); track option) {
        <u-option [value]="option.value()">
          <ng-container *ngTemplateOutlet="option.templateRef()" />
        </u-option>
      }
    </u-datalist>
  `,
})
export class SuggestionList {
  /**
   * Screen reader announcement template for singular result count.
   *
   * @default '%d forslag'
   */
  readonly singular = input('%d forslag')

  /**
   * Screen reader announcement template for plural result count.
   *
   * @default '%d forslag'
   */
  readonly plural = input('%d forslag')

  readonly options = contentChildren(SuggestionListOption, {
    descendants: true,
  })
}
