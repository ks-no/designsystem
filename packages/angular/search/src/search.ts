import { afterNextRender, Component, contentChild } from '@angular/core'
import {
  HostColor,
  HostSize,
  logIfDevMode,
} from '@ks-digital/designsystem-angular/__internals'
import { SearchInput } from './search-input'

/**
 * Search Component
 *
 * Use to contain the search input and buttons.
 * Only `SearchInput` is required, while `SearchClear` and `SearchButton` are optional.
 *
 * @example
 * <div ksd-search>
 *   <input ksd-search-input />
 *   <button ksd-search-clear></button>
 *   <button ksd-search-button></button>
 * </div>
 */
@Component({
  selector: 'ksd-search',
  template: `
    <ng-content select="[ksd-search-input]" />
    <ng-content select="[ksd-search-clear]" />
    <ng-content select="[ksd-search-button]" />
  `,
  host: {
    class: 'ds-search',
  },
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
})
export class Search {
  private readonly input = contentChild(SearchInput)

  constructor() {
    afterNextRender(() => {
      if (!this.input()) {
        logIfDevMode({
          component: 'Search',
          message:
            'Missing required elements: ksd-search-input must be provided as child. Check imports and markup.',
        })
      }
    })
  }
}
