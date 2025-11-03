import { Directive } from '@angular/core'

/**
 * Search input
 *
 * Used within SearchComponent to provide a search input.
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ksd-search-input]',
  standalone: true,
  host: {
    class: 'ds-input',
    type: 'search',
    placeholder: '', // Need empty placeholder to enable show/hide for clear button
  },
})
export class SearchInput {}
