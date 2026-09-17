import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  numberAttribute,
  output,
} from '@angular/core'
import { pagination } from '@digdir/designsystemet-web/ds-pagination'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

/**
 * A page entry, or an ellipsis placeholder that must render as an empty element
 * so `@digdir/designsystemet-css` can supply the "…" via `::before`.
 */
export type PaginationPage =
  | { type: 'page'; page: number; current: boolean; key: string }
  | { type: 'ellipsis'; key: string }

export interface PaginationPages {
  pages: PaginationPage[]
  prev: number
  next: number
}

const INTEGER = /^\d+$/

/** `data-page` is set by PaginationButton; `value` is set by <ds-pagination>. */
const readPage = (el: Element): number => {
  const raw =
    el.getAttribute('data-page') ??
    el.getAttribute('value') ??
    el.getAttribute('aria-label')
  return raw && INTEGER.test(raw) ? Number(raw) : 0
}

@Component({
  selector: 'ksd-pagination',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-pagination
      class="ds-pagination"
      [attr.data-current]="current()"
      [attr.data-total]="total()"
      [attr.data-href]="href()"
      [attr.aria-label]="ariaLabel()"
      (click)="onClick($event)"
    >
      <ng-content />
    </ds-pagination>
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
export class Pagination {
  /**
   * The current page
   */
  readonly current = input.required<number, string | number>({
    transform: numberAttribute,
  })

  /**
   * The total number of pages
   */
  readonly total = input.required<number, string | number>({
    transform: numberAttribute,
  })

  /**
   * Sets the screen reader label for the pagination
   */
  readonly ariaLabel = input<string>('Bla i sider', { alias: 'aria-label' })

  /**
   * How many pages to show. Default is 7
   */
  readonly show = input(7, {
    // numberAttribute defaults to NaN, which would collapse the page list.
    transform: (value: string | number | undefined) =>
      numberAttribute(value, 7),
  })

  /**
   * E.g if "?page=%d" all the links will set href to "?page=1", "?page=2".
   */
  readonly href = input<string>()

  /**
   * Emits the page number when a page is clicked
   */
  readonly pageClicked = output<number>()

  /**
   * Exposes pagination data for consumer use
   */
  readonly pages = computed<PaginationPages>(() => {
    const result = pagination({
      current: this.current(),
      total: this.total(),
      show: this.show(),
    })
    return {
      pages: result.pages.map((p) =>
        // Upstream uses page 0 as the ellipsis sentinel.
        p.page === 0
          ? { type: 'ellipsis', key: p.key }
          : {
              type: 'page',
              page: p.page,
              current: p.current === 'page',
              key: p.key,
            },
      ),
      prev: result.prev,
      next: result.next,
    }
  })

  protected onClick(e: Event) {
    const target = (e.target as HTMLElement).closest(
      '[data-page],[value],[aria-label]',
    )
    if (!target) return

    // 0 covers the ellipsis and an unavailable prev/next.
    const page = readPage(target)
    if (!page || page === this.current()) return

    e.preventDefault()
    this.pageClicked.emit(page)
  }
}
