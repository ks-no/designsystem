import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  contentChild,
} from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { CommonInputs } from '../common-inputs'
import { SearchButton } from './search-button'
import { SearchClear } from './search-clear'
import { SearchInput } from './search-input'

/**
 * Search Component
 *
 * Use to contain the search input and buttons.
 * Only `SearchInput` is required, while `SearchClear` and `SearchButton` are optional.
 *
 * @example
 * <div ksd-search>
 *   <input ksd-input ksdSearchInput />
 *   <button ksd-button ksdSearchClear></button>
 *   <button ksd-button ksdSearchButton></button>
 * </div>
 */
@Component({
  selector: '[ksd-search]',
  template: `
    <ng-content select="[ksdSearchInput]" />
    @if (hasClear()) {
      <ng-content select="[ksdSearchClear]" />
    }
    @if (hasButton()) {
      <ng-content select="[ksdSearchButton]" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-search',
  },
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
})
export class Search {
  private readonly input = contentChild(SearchInput)
  private readonly clear = contentChild(SearchClear)
  private readonly button = contentChild(SearchButton)

  protected readonly hasButton = () => !!this.button()
  protected readonly hasClear = () => !!this.clear()

  constructor() {
    afterNextRender(() => {
      if (!this.input()) {
        logIfDevMode({
          component: 'Search',
          message:
            'Missing required elements: SearchInput must be provided as child. Check imports and markup.',
        })
      }
    })
  }
}
