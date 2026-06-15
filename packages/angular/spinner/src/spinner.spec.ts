import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Spinner } from './spinner'

it('should render a spinner with title "loading"', async () => {
  await render(
    `
      <ksd-spinner aria-label="Loading">
    `,
    { imports: [Spinner] },
  )

  expect(screen.getByLabelText('Loading')).toBeInTheDocument()
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(`<ksd-spinner aria-label="Loading" />`, {
    imports: [Spinner],
  })

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
