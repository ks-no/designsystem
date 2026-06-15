import { NgStyle } from '@angular/common'
import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Alert } from './alert'

it('should render children, heading level 1', async () => {
  await render(
    `
        <ksd-alert color="info">
          <h1>Alert me!</h1>
        </ksd-alert>
      `,
    { imports: [Alert] },
  )

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Alert me!',
  )
})

it('style should be applied', async () => {
  await render(
    `
        <ksd-alert data-testid="alert" color="info" [ngStyle]="{ color: '#ffcc00' }" class="my-class">
          <h1>Alert me!</h1>
        </ksd-alert>
      `,
    { imports: [Alert, NgStyle] },
  )

  const alert = screen.getByTestId('alert')
  expect(alert).toHaveStyle({ color: '#ffcc00' })
  expect(alert).toHaveClass('my-class')
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(
    `
      <ksd-alert color="info">
        <h2>Alert me!</h2>
        <p>Alert content</p>
      </ksd-alert>
    `,
    { imports: [Alert] },
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
