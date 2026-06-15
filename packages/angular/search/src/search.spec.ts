import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Search } from './search'
import { SearchButton } from './search-button'
import { SearchClear } from './search-clear'
import { SearchInput } from './search-input'

test('should render minimal search component', async () => {
  await render(
    `
      <ksd-search>
        <input ksd-search-input role="searchbox" />
      </ksd-search>
    `,
    { imports: [SearchInput, Search] },
  )

  const searchElement = screen.getByRole('searchbox').parentElement
  expect(searchElement).toBeInTheDocument()
  expect(searchElement).toHaveClass('ds-search')
})

test('should clear the input when the clear button is clicked', async () => {
  await render(
    `
      <ksd-search>
        <input ksd-search-input role="searchbox" />
        <button ksd-search-clear role="button"></button>
        <button ksd-search-button></button>
      </ksd-search>
    `,
    {
      imports: [SearchInput, SearchClear, SearchButton, Search],
    },
  )

  const searchInput = screen.getByRole('searchbox') as HTMLInputElement
  const clearButton = screen.getByRole('button', {
    name: /tøm/i,
  }) as HTMLButtonElement

  await userEvent.type(searchInput, 'test')
  expect(searchInput.value).toBe('test')

  await userEvent.click(clearButton)
  expect(searchInput.value).toBe('')
})

test('should have no obvious accessibility violations', async () => {
  const { container } = await render(
    `
      <ksd-search>
        <input ksd-search-input role="searchbox" aria-label="Søk" />
        <button ksd-search-button aria-label="Søk"></button>
      </ksd-search>
    `,
    { imports: [SearchInput, SearchButton, Search] },
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
