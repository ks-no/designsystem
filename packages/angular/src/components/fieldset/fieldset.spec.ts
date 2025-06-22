import { render, screen, waitFor } from '@testing-library/angular'
import { Checkbox } from '../checkbox/checkbox'
import { Field } from '../field/field'
import { Label } from '../label/label'
import { ValidationMessage } from '../validation-message/validation-message'
import { Fieldset } from './fieldset'
import { FieldsetLegend } from './fieldset-legend'

describe('Should connect checkbox and validation message with aria-describedby', () => {
    test('should work with one checkbox', async () => {
        await render(
            `
    <fieldset ksd-fieldset>
      <legend ksd-fieldset-legend>Hi</legend>
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="some-value"  />
    </ksd-field>
    <p ksd-validation-message>This is a validation message</p>
    </fieldset>
    
    `,
            {
                imports: [
                    Fieldset,
                    FieldsetLegend,
                    Field,
                    Label,
                    Checkbox,
                    ValidationMessage,
                ],
            },
        )
        const checkbox = screen.getByRole('checkbox')
        const validationMessage = screen.getByText('This is a validation message')
        await waitFor(() => {
            expect(checkbox.getAttribute('aria-describedby')).toBe(
                validationMessage.getAttribute('id'),
            )
        })
    })

    test('should work with multiple checkboxes', async () => {
        await render(
            `
    <fieldset ksd-fieldset>
      <legend ksd-fieldset-legend>Hi</legend>
      <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="some-value"  />
    </ksd-field>
    <ksd-field>
        <ksd-label> Check me </ksd-label>
        <input ksd-checkbox value="some-other-value"  />
    </ksd-field>
    <p ksd-validation-message>This is a validation message</p>
    </fieldset>
      `,
            {
                imports: [
                    Fieldset,
                    FieldsetLegend,
                    Field,
                    Label,
                    Checkbox,
                    ValidationMessage,
                ],
            },
        )
        const checkboxes = screen.getAllByRole('checkbox')
        const validationMessage = screen.getByText('This is a validation message')
        await waitFor(() => {
            checkboxes.forEach((checkbox) => {
                expect(checkbox.getAttribute('aria-describedby')).toBe(
                    validationMessage.getAttribute('id'),
                )
            })
        })
    })
})
