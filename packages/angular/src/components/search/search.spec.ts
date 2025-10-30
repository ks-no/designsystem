import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'
import { Input } from '../input'
import { Search } from './search'
import { SearchButton } from './search-button'
import { SearchClear } from './search-clear'
import { SearchInput } from './search-input'

test('should render minimal search component', async () => {
  await render(
    `
      <div ksd-search>
        <input ksd-input ksdSearchInput role="searchbox" />
      </div>
    `,
    { imports: [SearchInput, Search, Input] },
  )

  const searchElement = screen.getByRole('searchbox').parentElement
  expect(searchElement).toBeInTheDocument()
  expect(searchElement).toHaveClass('ds-search')
})

test('should clear the input when the clear button is clicked', async () => {
  await render(
    `
      <div ksd-search>
        <input ksd-input ksdSearchInput role="searchbox" />
        <button ksd-button ksdSearchClear role="button"></button>
        <button ksd-button ksdSearchButton></button>
      </div>
    `,
    {
      imports: [SearchInput, SearchClear, SearchButton, Search, Input, Button],
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
