import { render, screen } from '@testing-library/angular'
import { Input } from '../input'
import { Label } from '../label'
import { Field } from './field'
import { FieldDescription } from './field-description'

test('should connect checkbox and label', async () => {
  await render(
    `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-input type="checkbox" value="telefon"  />
    </ksd-field>`,
    { imports: [Field, Label, Input] },
  )

  const label = screen.getByText('Check me')
  const checkbox = screen.getByRole('checkbox')

  expect(label.getAttribute('for')).toBe(checkbox.getAttribute('id'))
})

describe('should connect checkbox and description', () => {
  test('should connect checkbox and description', async () => {
    await render(
      `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-input type="checkbox" value="telefon"  />
        <p ksd-field-description>Description</p>
    </ksd-field>`,
      { imports: [Field, Label, Input, FieldDescription] },
    )

    const checkbox = screen.getByRole('checkbox')
    const description = screen.getByText('Description')

    expect(checkbox.getAttribute('aria-describedby')).toBe(
      description.getAttribute('id'),
    )
  })

  test('should not connect checkbox and description if description is not provided', async () => {
    await render(
      `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-input type="checkbox" value="telefon"  />
    </ksd-field>`,
      { imports: [Field, Label, Input] },
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-describedby')).toBeNull()
  })

  test('should keep existing aria-describedby', async () => {
    await render(
      `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-input type="checkbox" value="telefon" aria-describedby="existing-id"  />
    </ksd-field>`,
      { imports: [Field, Label, Input] },
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.getAttribute('aria-describedby')).toBe('existing-id')
  })

  test('should pass through a user-supplied id', async () => {
    await render(
      `
    <ksd-field>
      <ksd-label> Check me </ksd-label>
        <input ksd-input type="checkbox" value="telefon" id="test" />
    </ksd-field>`,
      { imports: [Field, Label, Input] },
    )

    const input = screen.getByRole('checkbox')

    expect(input).toHaveAttribute('id', 'test')
  })
})
