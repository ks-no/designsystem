import { render, screen } from '@testing-library/angular'
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
