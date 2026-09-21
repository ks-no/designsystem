import { computed, Directive, input } from '@angular/core'
import type { PaginationPage } from './pagination'

/** Accepts a string so the valueless `<button ksdPaginationButton>` form still type-checks. */
type PageInput = PaginationPage | number | string | null | undefined

@Directive({
  selector: '[ksdPaginationButton]',
  host: {
    class: 'ds-button',
    // The pagination CSS restores the primary look for [aria-current=true].
    'data-variant': 'tertiary',
    '[attr.data-page]': 'pageNumber()',
    '[attr.aria-current]': 'isCurrent() ? "true" : null',
  },
})
export class PaginationButton {
  /**
   * The page this control targets. Pass an entry from `pages().pages`, or a
   * number for the previous/next controls.
   */
  readonly page = input<PageInput>(null, { alias: 'ksdPaginationButton' })

  protected readonly pageNumber = computed(() => {
    const value = this.page()
    if (typeof value === 'number') return value || null
    if (typeof value === 'object' && value?.type === 'page') return value.page
    return null
  })

  protected readonly isCurrent = computed(() => {
    const value = this.page()
    return typeof value === 'object' && value?.type === 'page' && value.current
  })
}
