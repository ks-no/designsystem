import { fireEvent, render, screen, waitFor } from '@testing-library/angular'
import { vi } from 'vitest'
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
        <li><button ksdPaginationButton>Forrige</button></li>
        @for (page of pagination.pages().pages; track page.key) {
          <li><button ksdPaginationButton></button></li>
        }
        <li><button ksdPaginationButton>Neste</button></li>
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
        <li><a ksdPaginationButton>Forrige</a></li>
        @for (page of pagination.pages().pages; track page.key) {
          <li><a ksdPaginationButton></a></li>
        }
        <li><a ksdPaginationButton>Neste</a></li>
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
      // 7 page buttons + prev + next = 9
      expect(buttons.length).toBeGreaterThanOrEqual(9)
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

  it('should not emit pageClicked when clicking current page', async () => {
    const { onpageClicked } = await renderPagination({ current: 3, total: 10 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      const currentPageButton = buttons.find(
        (btn) => btn.getAttribute('aria-current') === 'true',
      )
      expect(currentPageButton).toBeTruthy()
    })

    const buttons = screen.getAllByRole('button')
    const currentPageButton = buttons.find(
      (btn) => btn.getAttribute('aria-current') === 'true',
    )

    if (currentPageButton) {
      fireEvent.click(currentPageButton)
      expect(onpageClicked).not.toHaveBeenCalled()
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

  it('should set data-variant to primary for current page', async () => {
    await renderPagination({ current: 3, total: 5 })

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      const currentButton = buttons.find(
        (btn) => btn.getAttribute('aria-current') === 'true',
      )
      expect(currentButton).toHaveAttribute('data-variant', 'primary')
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
})
