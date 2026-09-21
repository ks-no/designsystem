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
import { PaginationButton } from './pagination.button'

/**
 * A page entry, or an ellipsis placeholder that renders as an empty `<li>`.
 */
export type PaginationPage =
  | { type: 'page'; page: number; current: boolean; key: string }
  | { type: 'ellipsis'; key: string }

export interface PaginationPages {
  pages: PaginationPage[]
  prev: number
  next: number
}

@Component({
  selector: 'ksd-pagination',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [PaginationButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Deliberately no data-current/data-total. Those put <ds-pagination> into the
  // mode where it rewrites aria-label, role, tabindex, value and href on every
  // button/a child. We render the accessible markup ourselves instead.
  template: `
    <ds-pagination
      class="ds-pagination"
      [attr.aria-label]="ariaLabel()"
      (click)="onClick($event)"
    >
      <ng-content>
        <ol>
          <li>
            @if (href()) {
              <a
                [ksdPaginationButton]="pages().prev"
                [attr.href]="hrefFor(pages().prev)"
                [attr.aria-hidden]="pages().prev ? null : 'true'"
                >{{ previousLabel() }}</a
              >
            } @else {
              <button
                type="button"
                [ksdPaginationButton]="pages().prev"
                [disabled]="!pages().prev"
                [attr.aria-hidden]="pages().prev ? null : 'true'"
              >
                {{ previousLabel() }}
              </button>
            }
          </li>
          @for (page of pages().pages; track page.key) {
            @if (page.type === 'page') {
              <li>
                @if (href()) {
                  <a
                    [ksdPaginationButton]="page"
                    [attr.href]="hrefFor(page.page)"
                    [attr.aria-label]="labelFor(page.page)"
                    >{{ page.page }}</a
                  >
                } @else {
                  <button
                    type="button"
                    [ksdPaginationButton]="page"
                    [attr.aria-label]="labelFor(page.page)"
                  >
                    {{ page.page }}
                  </button>
                }
              </li>
            } @else {
              <li></li>
            }
          }
          <li>
            @if (href()) {
              <a
                [ksdPaginationButton]="pages().next"
                [attr.href]="hrefFor(pages().next)"
                [attr.aria-hidden]="pages().next ? null : 'true'"
                >{{ nextLabel() }}</a
              >
            } @else {
              <button
                type="button"
                [ksdPaginationButton]="pages().next"
                [disabled]="!pages().next"
                [attr.aria-hidden]="pages().next ? null : 'true'"
              >
                {{ nextLabel() }}
              </button>
            }
          </li>
        </ol>
      </ng-content>
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
    transform: (value: unknown) => numberAttribute(value, 7),
  })

  /**
   * E.g if "?page=%d" all the links will set href to "?page=1", "?page=2".
   */
  readonly href = input<string>()

  /**
   * Label for the previous button. Only used when no content is projected.
   */
  readonly previousLabel = input('Forrige')

  /**
   * Label for the next button. Only used when no content is projected.
   */
  readonly nextLabel = input('Neste')

  /**
   * Screen reader label for each page. Only used when no content is projected.
   */
  readonly pageLabel = input('Side %d')

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
        // The page helper uses 0 as the ellipsis sentinel.
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

  protected hrefFor(page: number) {
    return page ? (this.href()?.replace('%d', String(page)) ?? null) : null
  }

  protected labelFor(page: number) {
    return this.pageLabel().replace('%d', String(page))
  }

  protected onClick(e: Event) {
    const root = e.currentTarget as HTMLElement
    const target = (e.target as HTMLElement).closest('button,a')
    if (!target || !root.contains(target)) return

    const page = Number(target.getAttribute('data-page'))
    if (!page || page === this.current()) return

    e.preventDefault()
    this.pageClicked.emit(page)
  }
}
