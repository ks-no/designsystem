import { NgStyle } from '@angular/common'
import { render, screen } from '@testing-library/angular'
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
  expect(alert).toHaveStyle({ display: 'block' })
  expect(alert).toHaveStyle({ color: '#ffcc00' })
  expect(alert).toHaveClass('my-class')
})
