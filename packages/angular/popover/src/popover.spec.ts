import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Popover } from './popover'

const renderPopover = async () => {
  return await render(
    `
  <button popovertarget="my-popover"> enkel popover</button>
    <div ksd-popover id="my-popover" data-placement="top" >
      her er det noe innhold
    </div>
  `,
    {
      imports: [Popover],
    },
  )
}

const contentText = 'her er det noe innhold'

// jsdom does not implement the Popover API (jsdom/jsdom#3721), so `[popover]`
// elements always compute to `display: none`. Assert on the popover state, which
// the polyfill in designsystemet-web resolves correctly, instead of visibility.
const getPopover = () => screen.getByText(contentText)
const isOpen = () => getPopover().matches(':popover-open')

describe('Popover', () => {
  const user = userEvent.setup()

  it('should render popover on trigger-click when closed', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //popover button should be visible
    expect(popoverButton).toBeVisible()

    //the popover content should not be visible yet
    expect(isOpen()).toBe(false)

    //click button to see popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(true)
  })

  it('should close when we click the button twice', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //the popover content should not be visible yet
    expect(isOpen()).toBe(false)

    //click button to see popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(true)

    //click button again to hide popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(false)
  })

  it('should close when we press ESC', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(true)

    //press ESC to hide popover
    await user.keyboard('[Escape]')
    expect(isOpen()).toBe(false)
  })

  it('should close when we press SPACE', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(true)

    //press SPACE to hide popover
    await user.keyboard('[Space]')
    expect(isOpen()).toBe(false)
  })

  it('should close when we press ENTER', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(true)

    //press ENTER to hide popover
    await user.keyboard('[Enter]')
    expect(isOpen()).toBe(false)
  })

  it('should not close if we click inside the popover', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(isOpen()).toBe(true)

    //click inside the popover
    await user.click(getPopover())
    expect(isOpen()).toBe(true)
  })

  it('should have correct id and popovertarget attributes', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })
    const popover = screen.getByText(contentText).closest('[ksd-popover]')

    expect(popoverButton.getAttribute('popovertarget')).toBe(popover.id)
  })

  it('should have no obvious accessibility violations', async () => {
    const { container } = await renderPopover()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
