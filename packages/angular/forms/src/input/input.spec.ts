import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Input } from './input'

test('should render', async () => {
  await render(
    `
        <input ksd-input type="text"  />
    `,
    { imports: [Input] },
  )

  expect(screen.getByRole('textbox')).toBeDefined()
})

test('should set aria-invalid', async () => {
  await render(
    `
        <input ksd-input type="text" aria-invalid="true"  />
    `,
    { imports: [Input] },
  )

  expect(screen.getByRole('textbox')).toBeDefined()
  expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe('true')
})

test('should have no obvious accessibility violations', async () => {
  const { container } = await render(
    `
      <label for="my-input">My label</label>
      <input ksd-input id="my-input" type="text" />
    `,
    { imports: [Input] },
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
