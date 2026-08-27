import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { ValidationMessage } from './validation-message'

it('should render validation message', async () => {
  await render(`<p ksd-validation-message>This field is required</p>`, {
    imports: [ValidationMessage],
  })

  const message = screen.getByText('This field is required')
  expect(message).toBeInTheDocument()
  expect(message).toHaveClass('ds-validation-message')
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(
    `
    <label for="my-input">My input</label>
    <input id="my-input" type="text" aria-describedby="my-validation" />
    <p ksd-validation-message id="my-validation">This field is required</p>
    `,
    { imports: [ValidationMessage] },
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
