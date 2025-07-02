import { render, screen } from '@testing-library/angular'
import { Field } from '../field/field'
import { Label } from '../label/label'
import { Input } from './input'

test('should render', async () => {
  await render(
    `
        <ksd-field>
        <ksd-label>Label</ksd-label>
        <input ksd-input type="text"  />
        </ksd-field>
    `,
    { imports: [Field, Label, Input] },
  )

  expect(screen.getByRole('textbox')).toBeDefined()
})
