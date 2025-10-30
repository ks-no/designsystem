import { afterNextRender, Directive, ElementRef, inject } from '@angular/core'
import { logIfDevMode } from '../../utils/log-if-devmode'
import { Input } from '../input'

/**
 * Search input
 *
 * Used within SearchComponent to provide a search input.
 */
@Directive({
  selector: 'input[ksdSearchInput]',
  standalone: true,
  host: {
    type: 'search',
    placeholder: '', // Need empty placeholder to enable show/hide for clear button
  },
})
export class SearchInput {
  private readonly input = inject(ElementRef<Input>)

  constructor() {
    afterNextRender(() => {
      const hasKsdInput = this.input.nativeElement.hasAttribute('ksd-input')
      if (!hasKsdInput) {
        logIfDevMode({
          component: 'SearchInput',
          message:
            'Missing required elements: ksd-input must be provided for the SearchInput. Check imports and markup.',
        })
      }
    })
  }
}
