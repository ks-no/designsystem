import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
} from '@angular/core'
import { pagination } from '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

export interface PaginationPage {
  page: number
  current: boolean
  key: string
}

export interface PaginationPages {
  pages: PaginationPage[]
  prev: number
  next: number
}

@Component({
  selector: 'ksd-pagination',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  readonly current = input.required<number>()

  /**
   * The total number of pages
   */
  readonly total = input.required<number>()

  /**
   * Sets the screen reader label for the pagination
   */
  readonly ariaLabel = input<string>('Bla i sider', { alias: 'aria-label' })

  /**
   * How many pages to show. Default is 7
   */
  readonly show = input(7)

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
      pages: result.pages.map((p) => ({
        page: p.page,
        current: p.current === 'page',
        key: p.key,
      })),
      prev: result.prev,
      next: result.next,
    }
  })

  protected onClick(e: Event) {
    const target = (e.target as HTMLElement).closest('[aria-label]')
    if (!target) return

    const label = target.getAttribute('aria-label')
    if (!label) return

    const page = Number(label)
    if (!isNaN(page) && page !== this.current()) {
      e.preventDefault()
      this.pageClicked.emit(page)
    }
  }
}
