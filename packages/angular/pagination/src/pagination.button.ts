import { DestroyRef, Directive, ElementRef, inject, input } from '@angular/core'
import type { PaginationPage } from './pagination'

/** Accepts a string so the valueless `<button ksdPaginationButton>` form still type-checks. */
type PageInput = PaginationPage | number | string | null | undefined

const toPageNumber = (value: PageInput): number | null => {
  if (typeof value === 'number') return value || null
  if (typeof value === 'object' && value?.type === 'page') return value.page
  return null
}

@Directive({
  selector: '[ksdPaginationButton]',
  host: {
    class: 'ds-button',
    '[attr.data-page]': 'page()',
  },
})
export class PaginationButton {
  private el = inject<ElementRef<HTMLElement>>(ElementRef)
  private destroyRef = inject(DestroyRef)

  /**
   * The page this button targets. Pass an entry from `pages().pages`, or a
   * number for the previous/next buttons. Null for the ellipsis.
   */
  readonly page = input<number | null, PageInput>(null, {
    alias: 'ksdPaginationButton',
    transform: toPageNumber,
  })

  constructor() {
    const observer = new MutationObserver(() => this.updateVariant())
    observer.observe(this.el.nativeElement, {
      attributes: true,
      attributeFilter: ['aria-current'],
    })
    this.updateVariant()

    this.destroyRef.onDestroy(() => observer.disconnect())
  }

  private updateVariant() {
    const isCurrent =
      this.el.nativeElement.getAttribute('aria-current') === 'true'
    this.el.nativeElement.setAttribute(
      'data-variant',
      isCurrent ? 'primary' : 'tertiary',
    )
  }
}
