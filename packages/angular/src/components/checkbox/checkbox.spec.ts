import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../checkbox/checkbox'

test('should not be clickable if readonly', async () => {
  await render(
    `
        <input ksd-checkbox type="checkbox" value="my-checkbox" readonly />
    `,
    { imports: [Checkbox] },
  )

  const checkbox = screen.getByRole('checkbox') as HTMLInputElement
  await userEvent.click(checkbox)
  expect(checkbox.checked).toBe(false)
})
