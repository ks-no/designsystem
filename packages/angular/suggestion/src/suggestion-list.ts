import { NgTemplateOutlet } from '@angular/common'
import {
  booleanAttribute,
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
      [attr.data-autoplacement]="autoPlacement()"
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

  /**
   * Whether to enable auto placement.
   *
   * @default true
   */
  readonly autoPlacement = input(true, {
    transform: booleanAttribute,
  })

  readonly options = contentChildren(SuggestionListOption, {
    descendants: true,
  })
}
