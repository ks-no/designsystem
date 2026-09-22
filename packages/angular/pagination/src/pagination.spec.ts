import { fireEvent, render, screen, waitFor } from '@testing-library/angular'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Pagination } from './pagination'
import { PaginationButton } from './pagination.button'

window.dsWarnings = false

const renderDefault = async (template: string, props: object = {}) => {
  const onpageClicked = vi.fn()
  const result = await render(template, {
    imports: [Pagination, PaginationButton],
    componentProperties: { ...props, onpageClicked },
  })
  await waitFor(() => expect(result.container.querySelector('ol')).toBeTruthy())
  return { ...result, onpageClicked }
}

const controls = (c: Element) => [...c.querySelectorAll('li > button, li > a')]

describe('Pagination', () => {
  it('should render with navigation role', async () => {
    await renderDefault(`<ksd-pagination [current]="3" [total]="50" />`)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render prev, pages and next', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" [show]="7" />`,
    )

    expect(screen.getByText('Forrige')).toBeInTheDocument()
    expect(screen.getByText('Neste')).toBeInTheDocument()
    // 7 entries, one of which is an ellipsis, plus prev and next.
    expect(controls(container).length).toBe(8)
  })

  it('should write the page number as visible text', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" />`,
    )

    const page = container.querySelector('[data-page="4"]')
    expect(page?.textContent?.trim()).toBe('4')
  })

  it('should render the ellipsis as an empty li', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="10" [total]="50" />`,
    )

    const empty = [...container.querySelectorAll('li')].filter(
      (li) => li.children.length === 0,
    )
    expect(empty.length).toBe(2)
    empty.forEach((li) => expect(li.textContent).toBe(''))
  })

  it('should mark the current page with aria-current', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" />`,
    )

    const current = container.querySelectorAll('[aria-current="true"]')
    expect(current.length).toBe(1)
    expect(current[0].getAttribute('data-page')).toBe('3')
  })

  it('should label pages for screen readers', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" pageLabel="Page %d" />`,
    )

    expect(
      container.querySelector('[data-page="4"]')?.getAttribute('aria-label'),
    ).toBe('Page 4')
  })

  it('should name prev/next by their visible text', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" />`,
    )

    const [prev] = controls(container)
    const next = controls(container).at(-1) as Element
    expect(prev.getAttribute('aria-label')).toBeNull()
    expect(prev.textContent?.trim()).toBe('Forrige')
    expect(next.getAttribute('aria-label')).toBeNull()
    expect(next.textContent?.trim()).toBe('Neste')
  })

  it('should use custom previous and next labels', async () => {
    await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" previousLabel="Prev" nextLabel="Next" />`,
    )

    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('should show fewer pages when show is reduced', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" [show]="3" />`,
    )

    expect(controls(container).length).toBeLessThanOrEqual(5)
  })

  it('should fall back to 7 pages when show is undefined', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" [show]="show" />`,
      { show: undefined },
    )

    expect(controls(container).length).toBeGreaterThan(3)
  })
})

describe('Pagination interaction', () => {
  it('should emit pageClicked with the clicked page', async () => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" (pageClicked)="onpageClicked($event)" />`,
    )

    fireEvent.click(container.querySelector('[data-page="5"]') as Element)
    expect(onpageClicked).toHaveBeenCalledWith(5)
  })

  it('should not emit for the current page', async () => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" (pageClicked)="onpageClicked($event)" />`,
    )

    fireEvent.click(container.querySelector('[aria-current="true"]') as Element)
    expect(onpageClicked).not.toHaveBeenCalled()
  })

  it('should not emit when the ellipsis area is clicked', async () => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="10" [total]="50" (pageClicked)="onpageClicked($event)" />`,
    )

    const empty = [...container.querySelectorAll('li')].find(
      (li) => li.children.length === 0,
    )
    fireEvent.click(empty as Element)
    expect(onpageClicked).not.toHaveBeenCalled()
  })

  it('should emit when a nested element inside a control is clicked', async () => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" (pageClicked)="onpageClicked($event)" #p>
         <ol>
           <li><button [ksdPaginationButton]="p.pages().prev"><span>Forrige</span></button></li>
           @for (page of p.pages().pages; track page.key) {
             @if (page.type === 'page') {
               <li><button [ksdPaginationButton]="page">{{ page.page }}</button></li>
             } @else {
               <li></li>
             }
           }
           <li><button [ksdPaginationButton]="p.pages().next">Neste</button></li>
         </ol>
       </ksd-pagination>`,
    )

    fireEvent.click(container.querySelector('span') as Element)
    expect(onpageClicked).toHaveBeenCalledWith(2)
  })
})

describe('Pagination disabled controls', () => {
  it('should disable previous on the first page', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="1" [total]="50" />`,
    )

    const [prev] = controls(container)
    expect(prev).toBeDisabled()
    expect(prev).toHaveAttribute('aria-hidden', 'true')
    expect(prev).not.toHaveAttribute('data-page')
  })

  it('should disable next on the last page', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="50" [total]="50" />`,
    )

    const next = controls(container).at(-1) as Element
    expect(next).toBeDisabled()
    expect(next).toHaveAttribute('aria-hidden', 'true')
    expect(next).not.toHaveAttribute('data-page')
  })

  it('should not give a disabled link an href', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="1" [total]="50" href="?page=%d" />`,
    )

    const [prev] = controls(container)
    expect(prev.tagName).toBe('A')
    expect(prev).not.toHaveAttribute('href')
    expect(prev).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Pagination with links', () => {
  it('should render anchors with generated hrefs', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" href="?page=%d" />`,
    )

    expect(container.querySelectorAll('li > button').length).toBe(0)
    expect(container.querySelector('a[href="?page=4"]')).toBeTruthy()
  })

  it('should emit pageClicked and prevent navigation', async () => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" href="?page=%d" (pageClicked)="onpageClicked($event)" />`,
    )

    const link = container.querySelector('a[href="?page=4"]') as Element
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    link.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    expect(onpageClicked).toHaveBeenCalledWith(4)
  })

  it.each([
    ['ctrl', { ctrlKey: true }],
    ['meta', { metaKey: true }],
    ['shift', { shiftKey: true }],
    ['alt', { altKey: true }],
    ['middle', { button: 1 }],
  ])('should leave %s-click on a link to the browser', async (_, modifier) => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" href="?page=%d" (pageClicked)="onpageClicked($event)" />`,
    )

    const link = container.querySelector('a[href="?page=4"]') as Element
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      ...modifier,
    })
    link.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
    expect(onpageClicked).not.toHaveBeenCalled()
  })

  it('should still activate a button on ctrl-click', async () => {
    const { container, onpageClicked } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" (pageClicked)="onpageClicked($event)" />`,
    )

    const button = container.querySelector('[data-page="4"]') as Element
    button.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        ctrlKey: true,
      }),
    )

    expect(onpageClicked).toHaveBeenCalledWith(4)
  })
})

describe('Pagination content projection', () => {
  it('should render the fallback when only whitespace is projected', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50">
       </ksd-pagination>`,
    )

    expect(controls(container).length).toBe(8)
  })

  it('should let projected content replace the fallback', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" #p>
         <ol>
           <li><button [ksdPaginationButton]="p.pages().prev">MINE</button></li>
           <li><button [ksdPaginationButton]="p.pages().next">MINE2</button></li>
         </ol>
       </ksd-pagination>`,
    )

    expect(controls(container).length).toBe(2)
    expect(screen.queryByText('Forrige')).not.toBeInTheDocument()
  })
})

describe('PaginationButton', () => {
  it('should add ds-button class and the tertiary variant', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="3" [total]="50" />`,
    )

    controls(container).forEach((control) => {
      expect(control).toHaveClass('ds-button')
      expect(control).toHaveAttribute('data-variant', 'tertiary')
    })
  })

  it('should not set data-page for an ellipsis entry', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="10" [total]="50" #p>
         <ol>
           <li><button [ksdPaginationButton]="p.pages().prev">Forrige</button></li>
           @for (page of p.pages().pages; track page.key) {
             <li><button [ksdPaginationButton]="page">x</button></li>
           }
           <li><button [ksdPaginationButton]="p.pages().next">Neste</button></li>
         </ol>
       </ksd-pagination>`,
    )

    const withoutPage = controls(container).filter(
      (el) => !el.hasAttribute('data-page'),
    )
    expect(withoutPage.length).toBe(2)
  })
})

describe('Pagination accessibility', () => {
  it('should have no violations with buttons', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="10" [total]="50" />`,
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should have no violations with links', async () => {
    const { container } = await renderDefault(
      `<ksd-pagination [current]="10" [total]="50" href="?page=%d" />`,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
