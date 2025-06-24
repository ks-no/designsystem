import { render, screen } from '@testing-library/angular';
import { Field } from '../field/field';
import { Input } from '../input/input';
import { Label } from '../label/label';


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
