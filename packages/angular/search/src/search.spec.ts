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

  // The clear button stays hidden until the input has a value
  expect(screen.queryByRole('button', { name: /tøm/i })).not.toBeInTheDocument()

  await userEvent.type(searchInput, 'test')
  expect(searchInput.value).toBe('test')

  const clearButton = screen.getByRole('button', {
    name: /tøm/i,
  }) as HTMLButtonElement

  await userEvent.click(clearButton)
  expect(searchInput.value).toBe('')
})

test('should notify controlled consumers through the input event when cleared', async () => {
  const state = { value: '' }
  const onInput = vi.fn((event: Event) => {
    state.value = (event.target as HTMLInputElement).value
  })

  await render(
    `
      <ksd-search>
        <input ksd-search-input role="searchbox" [value]="value" (input)="onInput($event)" />
        <button ksd-search-clear></button>
      </ksd-search>
    `,
    {
      imports: [SearchInput, SearchClear, Search],
      componentProperties: { value: '', onInput },
    },
  )

  const searchInput = screen.getByRole('searchbox') as HTMLInputElement
  await userEvent.type(searchInput, 'pizza')
  expect(state.value).toBe('pizza')

  onInput.mockClear()
  await userEvent.click(screen.getByRole('button', { name: /tøm/i }))

  expect(onInput).toHaveBeenCalledTimes(1)
  expect(state.value).toBe('')
  expect(searchInput.value).toBe('')
})

test('should keep an initial value and show the clear button for it', async () => {
  await render(
    `
      <ksd-search>
        <input ksd-search-input role="searchbox" value="pizza" />
        <button ksd-search-clear></button>
      </ksd-search>
    `,
    { imports: [SearchInput, SearchClear, Search] },
  )

  const searchInput = screen.getByRole('searchbox') as HTMLInputElement
  expect(searchInput.value).toBe('pizza')
  expect(screen.getByRole('button', { name: /tøm/i })).toBeInTheDocument()
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
