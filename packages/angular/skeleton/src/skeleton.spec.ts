import { render, screen } from '@testing-library/angular'
import { expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { Skeleton } from './skeleton'

it('should render projected content', async () => {
  await render(
    `
        <ksd-skeleton>
          <span>Loading</span>
        </ksd-skeleton>
      `,
    { imports: [Skeleton] },
  )

  expect(screen.getByText('Loading')).toBeInTheDocument()
})

it('should expose the default rectangle variant', async () => {
  const { container } = await render(
    `
        <ksd-skeleton data-testid="skeleton"></ksd-skeleton>
      `,
    { imports: [Skeleton] },
  )

  const skeleton = screen.getByTestId('skeleton')
  expect(container.querySelector('ksd-skeleton')).toHaveClass('ds-skeleton')
  expect(skeleton).toHaveAttribute('data-variant', 'rectangle')
  expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  expect(skeleton).not.toHaveAttribute('data-text')
})

it('should expose the circle variant without text placeholder', async () => {
  await render(
    `
        <ksd-skeleton data-testid="skeleton" data-variant="circle"></ksd-skeleton>
      `,
    { imports: [Skeleton] },
  )

  const skeleton = screen.getByTestId('skeleton')
  expect(skeleton).toHaveAttribute('data-variant', 'circle')
  expect(skeleton).not.toHaveAttribute('data-text')
})

it('should render a text data-text placeholder for text variant', async () => {
  const { container } = await render(
    `
      <ksd-skeleton data-testid="skeleton" data-variant="text"></ksd-skeleton>
    `,
    { imports: [Skeleton] },
  )

  const skeleton = screen.getByTestId('skeleton')
  expect(skeleton).toHaveAttribute('data-variant', 'text')
  expect(skeleton).toHaveAttribute('data-text', '-')

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
