import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Input } from '../input'
import { Label } from './label'

it('should render label', async () => {
  await render(`<ksd-label>My label</ksd-label>`, { imports: [Label] })

  const label = screen.getByText('My label')
  expect(label).toBeInTheDocument()
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(
    `
    <ksd-label>My input label</ksd-label>
    <input ksd-input id="my-input" type="text" />
    `,
    { imports: [Label, Input] },
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
