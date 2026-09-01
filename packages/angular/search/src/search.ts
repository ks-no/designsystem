import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  viewChild,
} from '@angular/core'
import '@digdir/designsystemet-web'
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    :host {
      display: block;
    }
  `,
  // ds-suggestion hides the clear button while the input is empty
  template: `
    <ds-suggestion #suggestionElement class="ds-search">
      <ng-content select="[ksd-search-input]" />
      <ng-content select="[ksd-search-clear]" />
      <ng-content select="[ksd-search-button]" />
    </ds-suggestion>
  `,
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
  private readonly suggestionElement =
    viewChild.required<ElementRef<HTMLElement>>('suggestionElement')

  constructor() {
    afterNextRender(() => {
      // ds-suggestion only reads its children on connect, which happens before Angular projects them
      this.suggestionElement().nativeElement.dispatchEvent(new Event('input'))

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
