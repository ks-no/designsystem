import { Component } from '@angular/core'
import { Input } from '../input'

/**
 * Search input
 *
 * Used within SearchComponent to provide a search input.
 */
@Component({
  selector: 'input[ksd-search-input]',
  standalone: true,
  template: ` <ng-content /> `,
  host: {
    type: 'search',
    placeholder: '', // Need empty placeholder to enable show/hide for clear button
  },
})
export class SearchInput extends Input {}
