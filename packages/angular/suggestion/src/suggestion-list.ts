import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  contentChildren,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core'
import { SuggestionListEmpty } from './suggestion-list-empty'
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
      data-nofilter
      [attr.data-sr-singular]="singular()"
      [attr.data-sr-plural]="plural()"
    >
      @for (option of options(); track option) {
        <u-option [value]="option.value()">
          <ng-container *ngTemplateOutlet="option.templateRef()" />
        </u-option>
      }
      @if (empty()?.templateRef()) {
        <u-option data-empty value="" hidden>
          <ng-container *ngTemplateOutlet="empty()?.templateRef()" />
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

  protected readonly options = contentChildren(SuggestionListOption, {
    descendants: true,
  })

  protected readonly empty = contentChild(SuggestionListEmpty)
}
