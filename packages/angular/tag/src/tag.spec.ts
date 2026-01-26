import { render, screen } from '@testing-library/angular'
import { Tag } from './tag'

it('should render tag', async () => {
  await render(
    `
      <ksd-tag>My tag</ksd-tag>
    `,
    { imports: [Tag] },
  )

  const tag = screen.getByText('My tag')
  expect(tag).toBeInTheDocument()
})

it('should apply custom class', async () => {
  await render(
    `
      <ksd-tag class="my-class">My tag</ksd-tag>
    `,
    { imports: [Tag] },
  )

  const tag = screen.getByText('My tag')
  expect(tag).toHaveClass('my-class')
})
