import { render, screen } from '@testing-library/angular'
import { Input } from '../input/input'
import { Chip } from './chip'

it('Should render button chip', async () => {
  await render(`<button ksd-chip>My chip</button>`, { imports: [Chip] })

  const button = screen.getByRole('button', { name: 'My chip' })
  expect(button).toHaveClass('ds-chip')
  expect(button).toBeInTheDocument()
})

it('Should render label chip', async () => {
  await render(`<label ksd-chip>My label chip</label>`, { imports: [Chip] })

  const label = screen.getByText('My label chip')
  expect(label).toHaveClass('ds-chip')
  expect(label).toBeInTheDocument()
})

it('Should render checkbox chip', async () => {
  await render(
    `<label ksd-chip>
            <input ksd-input type="checkbox" />
            My checkbox chip
        </label>`,
    { imports: [Chip, Input] },
  )

  const label = screen.getByText('My checkbox chip')
  expect(label).toHaveClass('ds-chip')
  expect(label).toBeInTheDocument()
})
