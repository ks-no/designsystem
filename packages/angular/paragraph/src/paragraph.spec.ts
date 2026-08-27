import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Paragraph } from './paragraph'

it('should render paragraph', async () => {
  await render(`<p ksd-paragraph>Some text</p>`, { imports: [Paragraph] })

  const paragraph = screen.getByText('Some text')
  expect(paragraph).toBeInTheDocument()
  expect(paragraph).toHaveClass('ds-paragraph')
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(`<p ksd-paragraph>Some text</p>`, {
    imports: [Paragraph],
  })

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
