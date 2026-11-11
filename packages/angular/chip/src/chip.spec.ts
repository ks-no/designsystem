import { Input } from '@ks-digital/designsystem-angular/forms'
import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
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

it('Should render radio chip', async () => {
  await render(
    `<label ksd-chip>
           <input ksd-input type="radio" />
           My radio chip
         </label>`,
    { imports: [Chip, Input] },
  )

  const label = screen.getByText('My radio chip')
  expect(label).toHaveClass('ds-chip')
  expect(label).toBeInTheDocument()
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(`<button ksd-chip>My chip</button>`, {
    imports: [Chip],
  })

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

it('should reflect data-removable, also when bound', async () => {
  await render(
    `<button ksd-chip data-removable>Static</button>
     <button ksd-chip [data-removable]="true">Bound</button>
     <button ksd-chip [data-removable]="false">Not removable</button>`,
    { imports: [Chip] },
  )

  expect(screen.getByText('Static')).toHaveAttribute('data-removable', 'true')
  expect(screen.getByText('Bound')).toHaveAttribute('data-removable', 'true')
  expect(screen.getByText('Not removable')).not.toHaveAttribute(
    'data-removable',
  )
})
