import { fireEvent, render, screen, waitFor } from '@testing-library/angular'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Pagination } from './pagination'
import { PaginationButton } from './pagination.button'

window.dsWarnings = false

const renderPagination = async (props: {
  current: number
  total: number
  show?: number
  href?: string
}) => {
  const onpageClicked = vi.fn()
  const result = await render(
    `
    <ksd-pagination 
      [current]="current" 
      [total]="total" 
      [show]="show"
      [href]="href"
      (pageClicked)="onpageClicked($event)"
      #pagination
    >
      <ol>
        <li><button [ksdPaginationButton]="pagination.pages().prev">Forrige</button></li>
        @for (page of pagination.pages().pages; track page.key) {
          <li><button [ksdPaginationButton]="page"></button></li>
        }
        <li><button [ksdPaginationButton]="pagination.pages().next">Neste</button></li>
      </ol>
    </ksd-pagination>
    `,
    {
      imports: [Pagination, PaginationButton],
      componentProperties: {
        ...props,
        onpageClicked,
      },
    },
  )
  return { ...result, onpageClicked }
}

const renderPaginationWithLinks = async (props: {
  current: number
  total: number
  href: string
}) =>
  await render(
    `
    <ksd-pagination 
      [current]="current" 
      [total]="total"
      [href]="href"
      #pagination
    >
      <ol>
        <li><a [ksdPaginationButton]="pagination.pages().prev">Forrige</a></li>
        @for (page of pagination.pages().pages; track page.key) {
          <li><a [ksdPaginationButton]="page"></a></li>
        }
        <li><a [ksdPaginationButton]="pagination.pages().next">Neste</a></li>
      </ol>
    </ksd-pagination>
    `,
    {
      imports: [Pagination, PaginationButton],
      componentProperties: props,
    },
  )

describe('Pagination', () => {
  it('should render pagination with navigation role', async () => {
    await renderPagination({ current: 1, total: 10 })

    const pagination = screen.getByRole('navigation')
    expect(pagination).toBeInTheDocument()
  })

  it('should render correct number of page buttons', async () => {
    await renderPagination({ current: 5, total: 10, show: 7 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      // 7 pages shown, but ellipsis items get role="none" and are excluded.
      // 5 real page buttons + prev + next = 7
      expect(buttons.length).toBeGreaterThanOrEqual(7)
    })
  })

  it('should render prev and next buttons', async () => {
    await renderPagination({ current: 1, total: 10 })

    await waitFor(() => {
      expect(screen.getByText('Forrige')).toBeInTheDocument()
      expect(screen.getByText('Neste')).toBeInTheDocument()
    })
  })

  it('should emit pageClicked when a page button is clicked', async () => {
    const { onpageClicked } = await renderPagination({ current: 1, total: 10 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      const pageButton = buttons.find(
        (btn) => btn.getAttribute('aria-label') === '2',
      )
      expect(pageButton).toBeTruthy()
    })

    const buttons = screen.getAllByRole('button')
    const pageButton = buttons.find(
      (btn) => btn.getAttribute('aria-label') === '2',
    )

    if (pageButton) {
      fireEvent.click(pageButton)
      expect(onpageClicked).toHaveBeenCalledWith(2)
    }
  })

  it('should show fewer pages when show prop is reduced', async () => {
    await renderPagination({ current: 3, total: 10, show: 3 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      // 3 page buttons + prev + next = 5
      expect(buttons.length).toBeLessThanOrEqual(7)
    })
  })

  it('should leave the ellipsis empty so the CSS can render it', async () => {
    const { container } = await renderPagination({ current: 10, total: 50 })

    await waitFor(() => {
      const ellipsis = container.querySelectorAll('[aria-label="0"]')
      expect(ellipsis.length).toBeGreaterThan(0)
      ellipsis.forEach((el) => {
        expect(el.textContent).toBe('')
        expect(el).not.toHaveAttribute('data-page')
      })
    })
  })

  it('should not emit pageClicked for the ellipsis', async () => {
    const { container, onpageClicked } = await renderPagination({
      current: 10,
      total: 50,
    })

    await waitFor(() => {
      expect(container.querySelector('[aria-label="0"]')).toBeTruthy()
    })

    fireEvent.click(container.querySelector('[aria-label="0"]') as Element)
    expect(onpageClicked).not.toHaveBeenCalled()
  })

  it('should resolve the clicked page without reading aria-label', async () => {
    const onpageClicked = vi.fn()
    const { container } = await render(
      `
      <ksd-pagination [current]="1" [total]="10" (pageClicked)="onpageClicked($event)" #pagination>
        <ol>
          <li><button [ksdPaginationButton]="pagination.pages().prev">Forrige</button></li>
          @for (page of pagination.pages().pages; track page.key) {
            <li>
              <button
                [ksdPaginationButton]="page"
                [attr.aria-label]="page.type === 'page' ? 'Side ' + page.page : null"
              ></button>
            </li>
          }
          <li><button [ksdPaginationButton]="pagination.pages().next">Neste</button></li>
        </ol>
      </ksd-pagination>
      `,
      {
        imports: [Pagination, PaginationButton],
        componentProperties: { onpageClicked },
      },
    )

    const pageTwo = await waitFor(() => {
      const el = container.querySelector('[data-page="2"]')
      expect(el).toBeTruthy()
      return el as Element
    })

    fireEvent.click(pageTwo)
    expect(onpageClicked).toHaveBeenCalledWith(2)
  })
})

describe('PaginationButton', () => {
  it('should add ds-button class', async () => {
    await renderPagination({ current: 1, total: 5 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('ds-button')
      })
    })
  })

  it('should set data-variant to tertiary for non-current pages', async () => {
    await renderPagination({ current: 3, total: 5 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      const nonCurrentButtons = buttons.filter(
        (btn) => btn.getAttribute('aria-current') !== 'true',
      )

      nonCurrentButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-variant', 'tertiary')
      })
    })
  })
})

describe('Pagination with links', () => {
  it('should render links instead of buttons when href is provided', async () => {
    await renderPaginationWithLinks({ current: 1, total: 5, href: '?page=%d' })

    await waitFor(() => {
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
    })
  })

  it('should set href on links based on href pattern', async () => {
    await renderPaginationWithLinks({ current: 1, total: 5, href: '?page=%d' })

    await waitFor(() => {
      const links = screen.getAllByRole('link')
      const pageLink = links.find((link) =>
        link.getAttribute('href')?.includes('?page='),
      )
      expect(pageLink).toBeInTheDocument()
    })
  })

  it('should have no obvious accessibility violations', async () => {
    const { container } = await renderPaginationWithLinks({
      current: 1,
      total: 5,
      href: '?page=%d',
    })

    // Todo: Fix this
    const results = await axe(container, {
      rules: {
        'aria-allowed-role': { enabled: false },
        'presentation-role-conflict': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
