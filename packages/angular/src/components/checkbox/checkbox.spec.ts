import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Field } from '../field/field'
import { Input } from '../input/input'
import { Label } from '../label/label'

test('should not be clickable if readonly', async () => {
  await render(
    `
      <ksd-field>
        <ksd-label>My checkbox</ksd-label>
        <input ksd-input type="checkbox" value="my-checkbox" readonly />
      </ksd-field>
    `,
    { imports: [Field, Input, Label] },
  )

  const checkbox = screen.getByRole('checkbox') as HTMLInputElement
  await userEvent.click(checkbox)
  expect(checkbox.checked).toBe(false)
})
