import { render, screen } from '@testing-library/angular'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Spinner } from './spinner'

it('should render a spinner with aria-label', async () => {
  await render(`<ksd-spinner aria-label="Loading" />`, {
    imports: [Spinner],
  })

  expect(screen.getByLabelText('Loading')).toBeInTheDocument()
})

it('should render with aria-hidden', async () => {
  const { container } = await render(`<ksd-spinner aria-hidden="true" />`, {
    imports: [Spinner],
  })

  const svg = container.querySelector('svg')
  expect(svg).toHaveAttribute('aria-hidden', 'true')
})

it('should not set aria-hidden when not provided', async () => {
  const { container } = await render(`<ksd-spinner aria-label="Loading" />`, {
    imports: [Spinner],
  })

  const svg = container.querySelector('svg')
  expect(svg).not.toHaveAttribute('aria-hidden')
})

it('should apply data-size attribute', async () => {
  const { container } = await render(
    `<ksd-spinner aria-label="Loading" data-size="sm" />`,
    { imports: [Spinner] },
  )

  const svg = container.querySelector('svg')
  expect(svg).toHaveAttribute('data-size', 'sm')
})

it('should warn in dev mode when neither aria-label nor aria-hidden is provided', async () => {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

  await render(`<ksd-spinner />`, { imports: [Spinner] })

  expect(logSpy).toHaveBeenCalledWith(
    '[ksd-spinner] Either `aria-label` or `aria-hidden` must be provided.',
  )

  logSpy.mockRestore()
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(`<ksd-spinner aria-label="Loading" />`, {
    imports: [Spinner],
  })

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
