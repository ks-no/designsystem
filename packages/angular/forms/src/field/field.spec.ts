import { render, screen } from '@testing-library/angular'
import { axe } from 'vitest-axe'
import { Input } from '../input'
import { Label } from '../label'
import { Field } from './field'
import { FieldDescription } from './field-description'
import { FieldError } from './field-error'

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

test('should forward data-variant to ds-field', async () => {
  const { container } = await render(
    `
    <ksd-field data-variant="outline">
      <ksd-label> Check me </ksd-label>
      <input ksd-input type="checkbox" value="telefon" />
    </ksd-field>`,
    { imports: [Field, Label, Input] },
  )

  const dsField = container.querySelector('ds-field')

  expect(dsField).toHaveAttribute('data-variant', 'outline')
})

test('should support ksd-error element selector', async () => {
  await render(
    `
    <ksd-field>
      <ksd-label> Check me </ksd-label>
      <input ksd-input type="checkbox" value="telefon" />
      <ksd-error>Error message</ksd-error>
    </ksd-field>`,
    { imports: [Field, Label, Input, FieldError] },
  )

  expect(screen.getByText('Error message')).toBeVisible()
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

  it('should have no obvious accessibility violations', async () => {
    const { container } = await render(
      `
      <ksd-field>
        <ksd-label>My input</ksd-label>
        <input ksd-input type="text" />
      </ksd-field>`,
      { imports: [Field, Label, Input] },
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
