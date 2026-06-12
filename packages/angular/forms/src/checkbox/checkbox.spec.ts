import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Field } from '../field'
import { Input } from '../input'
import { Label } from '../label'

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

test('should have no obvious accessibility violations', async () => {
  const { container } = await render(
    `
      <ksd-field>
        <ksd-label>My checkbox</ksd-label>
        <input ksd-input type="checkbox" value="my-checkbox" />
      </ksd-field>
    `,
    { imports: [Field, Input, Label] },
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
