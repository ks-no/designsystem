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
  host: {
    style: 'display: none;',
  },
  template: ``,
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

  readonly empty = contentChild(SuggestionListEmpty)
}
