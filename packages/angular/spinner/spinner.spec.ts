import { render, screen } from '@testing-library/angular'
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
