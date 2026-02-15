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
  selector: 'nav[ksd-pagination]',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ds-pagination
      class="ds-pagination"
      [attr.data-current]="current()"
      [attr.data-total]="total()"
      [attr.data-href]="href()"
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
  readonly pageChanged = output<number>()

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
    const target = (e.target as HTMLElement).closest('[data-page]')
    if (!target) return

    const page = Number((target as HTMLElement).dataset['page'])
    if (page && page !== this.current()) {
      e.preventDefault()
      this.pageChanged.emit(page)
    }
  }
}
