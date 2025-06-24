import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Input } from '../input/input';

test('should not be clickable if readonly', async () => {
    await render(
        `
        <input ksd-input type="checkbox" value="my-checkbox" readonly />
    `,
        { imports: [Input] },
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    await userEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
})
