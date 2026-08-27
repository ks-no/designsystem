import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Dropdown } from './dropdown'

const renderDropdown = async () => {
  return await render(
    `
    <button popovertarget="my-dropdown">Åpne dropdown</button>
    <div ksd-dropdown id="my-dropdown" data-placement="bottom-end">
      <ul>
        <li><button>Item 1</button></li>
        <li><button>Item 2</button></li>
      </ul>
    </div>
    `,
    {
      imports: [Dropdown],
    },
  )
}

const itemText = 'Item 1'

describe('Dropdown', () => {
  const user = userEvent.setup()

  it('should render dropdown on trigger-click when closed', async () => {
    await renderDropdown()
    const triggerButton = await screen.findByRole('button', {
      name: /åpne dropdown/i,
    })

    expect(triggerButton).toBeVisible()
    expect(screen.queryByText(itemText)).not.toBeVisible()

    await user.click(triggerButton)
    expect(screen.queryByText(itemText)).toBeInTheDocument()
  })

  it('should close when we click the button twice', async () => {
    await renderDropdown()
    const triggerButton = await screen.findByRole('button', {
      name: /åpne dropdown/i,
    })

    expect(screen.queryByText(itemText)).not.toBeVisible()

    await user.click(triggerButton)
    expect(screen.queryByText(itemText)).toBeInTheDocument()

    await user.click(triggerButton)
    expect(screen.queryByText(itemText)).not.toBeVisible()
  })

  it('should close when we click outside', async () => {
    await renderDropdown()
    const triggerButton = await screen.findByRole('button', {
      name: /åpne dropdown/i,
    })

    await user.click(triggerButton)
    expect(screen.queryByText(itemText)).toBeInTheDocument()

    await user.click(document.body)
    expect(screen.queryByText(itemText)).not.toBeVisible()
  })

  it('should close when we press ESC', async () => {
    await renderDropdown()
    const triggerButton = await screen.findByRole('button', {
      name: /åpne dropdown/i,
    })

    await user.click(triggerButton)
    expect(screen.queryByText(itemText)).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.queryByText(itemText)).not.toBeVisible()
  })

  it('should not close when we click inside the dropdown', async () => {
    await renderDropdown()
    const triggerButton = await screen.findByRole('button', {
      name: /åpne dropdown/i,
    })

    await user.click(triggerButton)
    expect(screen.queryByText(itemText)).toBeInTheDocument()

    await user.click(screen.getByText(itemText))
    expect(screen.queryByText(itemText)).toBeInTheDocument()
  })

  it('should have correct id and popovertarget attributes', async () => {
    await renderDropdown()
    const triggerButton = await screen.findByRole('button', {
      name: /åpne dropdown/i,
    })
    const dropdown = screen.getByText(itemText).closest('[ksd-dropdown]')

    expect(triggerButton.getAttribute('popovertarget')).toBe(dropdown.id)
  })

  it('should have no obvious accessibility violations', async () => {
    const { container } = await renderDropdown()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
