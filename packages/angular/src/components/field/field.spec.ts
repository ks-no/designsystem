import { render, screen, waitFor } from '@testing-library/angular'
import { Checkbox } from '../checkbox/checkbox'
import { CheckboxDescription } from '../checkbox/checkbox-description'
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



describe('should connect checkbox and description', () => {
    test('should connect checkbox and description', async () => {
        await render(
            `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="telefon"  />
        <p ksd-checkbox-description>Description</p>
    </ksd-field>`,
            { imports: [Field, Label, Checkbox, CheckboxDescription] },
        )

        const checkbox = screen.getByRole('checkbox')
        const description = screen.getByText('Description')
        await waitFor(() => {
            expect(checkbox.getAttribute('aria-describedby')).toBe(description.getAttribute('id'))
        })
    })

    test('should not connect checkbox and description if description is not provided', async () => {
        await render(
            `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="telefon"  />
    </ksd-field>`,
            { imports: [Field, Label, Checkbox] },
        )

        const checkbox = screen.getByRole('checkbox')
        await waitFor(() => {
            expect(checkbox.getAttribute('aria-describedby')).toBeNull()
        })
    })

    test('should keep existing aria-describedby', async () => {
        await render(
            `
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="telefon" aria-describedby="existing-id"  />
    </ksd-field>`,
            { imports: [Field, Label, Checkbox] },
        )

        const checkbox = screen.getByRole('checkbox')
        await waitFor(() => {
            expect(checkbox.getAttribute('aria-describedby')).toBe('existing-id')
        })
    })
})
