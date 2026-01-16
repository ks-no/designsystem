import { render, screen } from '@testing-library/angular'
import { Button } from '../../button/src/button'
import { Pagination } from './pagination'

const renderPagination = async () =>
  await render(
    `
    <nav ksd-pagination aria-label="Sidenavigering" >
        <ul>
            <li>
            <button
                ksd-button
                data-variant="tertiary"
                type="button"
                aria-label="Forrige side"
            >
                Forrige
            </button>
            </li>
            <li>
            <button
                ksd-button
                data-variant="tertiary"
                type="button"
                aria-label="Side 1"
            >
                1
            </button>
            </li>
            <li>
            <button
                ksd-button
                data-variant="primary"
                type="button"
                aria-label="Side 2"
            >
                2
            </button>
            </li>
            <li>
            <button
                ksd-button
                data-variant="tertiary"
                type="button"
                aria-label="Neste side"
            >
                Neste
            </button>
            </li>
        </ul>
    </nav>
      
    `,
    { imports: [Button, Pagination] },
  )

it('should render pagination', async () => {
  await renderPagination()

  const pagination = screen.getByRole('navigation')
  expect(pagination).toBeInTheDocument()
  expect(pagination).toHaveClass('ds-pagination')

  const buttons = screen.getAllByRole('button')
  expect(buttons).toHaveLength(4)
})
