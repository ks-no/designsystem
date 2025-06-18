import { render, screen, waitFor } from '@testing-library/angular'
import { Checkbox } from '../checkbox/checkbox'
import { Label } from '../label/label'
import { Field } from './field'

test('should connect checkbox and label', async () => {
    await render(
        `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="telefon"  />
    </ksd-field>`,
        { imports: [Field, Label, Checkbox] },
    )

    const label = screen.getByText('Check me')
    const checkbox = screen.getByRole('checkbox')
    await waitFor(() => {
        expect(label.getAttribute('for')).toBe(checkbox.getAttribute('id'))
    })
})
