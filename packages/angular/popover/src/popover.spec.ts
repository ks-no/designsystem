import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Popover } from './popover'

const renderPopover = async () => {
  return await render(
    `
  <button popovertarget="my-popover"> enkel popover</button>
    <ksd-popover popoverId="my-popover" placement="top" >
      her er det noe innhold
    </ksd-popover>
  `,
    {
      imports: [Popover],
    },
  )
}

const contentText = 'her er det noe innhold'

describe('Popover', () => {
  beforeAll(() => {
    // window.getComputedStyle = () => <any>{};
  })
  const user = userEvent.setup()

  it('should render popover on trigger-click when closed', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //popover button should be visible
    expect(popoverButton).toBeVisible()

    //the popover content should not be visible yet
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()
  })

  it('should close when we click the button twice', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //the popover content should not be visible yet
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()

    //click button again to hide popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()
  })

  it('should close when we click outside', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()

    //click outside to hide popover
    await user.click(document.body)
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()
  })

  it('should close when we press ESC', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()

    //press ESC to hide popover
    await user.keyboard('[Escape]')
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()
  })

  it('should close when we press SPACE', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()

    //press SPACE to hide popover
    await user.keyboard('[Space]')
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()
  })

  it('should close when we press ENTER', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()

    //press ENTER to hide popover
    await user.keyboard('[Enter]')
    expect(screen.queryByText(contentText)).not.toBeInTheDocument()
  })

  it('should not close if we click inside the popover', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })

    //click button to see popover
    await user.click(popoverButton)
    expect(screen.queryByText(contentText)).toBeInTheDocument()

    //click inside the popover
    await user.click(screen.getByText(contentText))
    expect(screen.queryByText(contentText)).toBeInTheDocument()
  })

  it('should have correct id and popovertarget attributes', async () => {
    await renderPopover()
    const popoverButton = await screen.findByRole('button', {
      name: /enkel popover/i,
    })
    const popover = screen.getByTestId('popover')

    expect(popoverButton.getAttribute('popovertarget')).toBe(popover.id)
  })
})
