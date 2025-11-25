import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Input } from '../input/input'
import { Label } from '../label/label'
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

describe('FieldCounter', () => {
  test('should render counter with description and validation message connected to input', async () => {
    await render(
      `
    <ksd-field>
      <ksd-label> Check me </ksd-label>
      <input ksd-input [counter]="5" type="text"  />
    </ksd-field>`,
      { imports: [Field, Label, Input] },
    )

    const counter = screen.getByText('5 tegn igjen')
    const input = screen.getByRole('textbox')

    expect(input.getAttribute('aria-describedby')).toContain(
      counter.getAttribute('id'),
    )
  })

  test('should show a validation message if the input is too long', async () => {
    await render(
      `
    <ksd-field>
      <ksd-label> Check me </ksd-label>
      <input ksd-input [counter]="5" type="text"  />
    </ksd-field>`,
      { imports: [Field, Label, Input] },
    )

    const input = screen.getByRole('textbox')
    const user = userEvent.setup()

    await user.type(input, '123456')

    const visibleMessage = screen.getByText('1 tegn for mye', { selector: 'p' })
    expect(visibleMessage).toBeInTheDocument()

    const screenReaderMessage = screen.getByText('1 tegn for mye', {
      selector: 'div',
    })
    expect(screenReaderMessage).toBeInTheDocument()
    expect(screenReaderMessage).toHaveAttribute('aria-live', 'polite')
  })
})
