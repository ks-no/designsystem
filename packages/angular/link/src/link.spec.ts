import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Link } from './link'

describe('Link', () => {
  it('Renders an anchor element with the given text and href', async () => {
    await render(`<a ksd-link href="https://example.com">Example Link</a>`, {
      imports: [Link],
    })

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveTextContent('Example Link')
  })

  it('Appends given class name to the anchor element', async () => {
    await render(
      `<a ksd-link href="https://example.com" class="custom-class">Example Link</a>`,
      {
        imports: [Link],
      },
    )

    const link = screen.getByRole('link')
    expect(link).toHaveClass('ds-link')
    expect(link).toHaveClass('custom-class')
  })

  it('should have no obvious accessibility violations', async () => {
    const { container } = await render(
      `<a ksd-link href="https://example.com">Example Link</a>`,
      { imports: [Link] },
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
