import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular'
import { expect, userEvent, within } from 'storybook/internal/test'
import { CommonArgs } from '../../../.storybook/default-args'
import { Button } from '../button/button'
import { ControlledPopover } from './controlled-popover'
import { Popover } from './popover'

type PopoverArgs = CommonArgs & {
  variant: 'default' | 'tinted'
  placement: 'top' | 'bottom' | 'left' | 'right'
}

const meta: Meta<PopoverArgs> = {
  component: Popover,
  decorators: [
    moduleMetadata({
      imports: [ControlledPopover, Button],
    }),
  ],
  title: 'Komponenter/Popover',
  argTypes: {
    variant: {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    'data-size': {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    'data-color': {
      options: [
        'accent',
        'brand1',
        'brand2',
        'brand3',
        'neutral',
        'danger',
        'info',
        'success',
        'warning',
      ],
      control: { type: 'radio' },
    },
  },
}
export default meta
type Story = StoryObj<Popover>

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `

    <div style="margin: 0 auto; width:100%;  text-align:center;" >
      <button ksd-button variant="primary"  popovertarget="my-popover"> Enkel popover </button>
      <ksd-popover popoverId="my-popover"  ${argsToTemplate(args)}> Her er det noe innhold </ksd-popover>
    </div>
    `,
  }),
  play: async ({ canvasElement, step }: any) => {
    const contentText = 'Her er det noe innhold'
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    const popoverButton = await canvas.findByRole('button', {
      name: /enkel popover/i,
    })

    await step('Popover button should be visible ', async () => {
      await expect(popoverButton).toBeVisible()
    })

    await step(
      'Popover should not be visible before button is clicked',
      async () => {
        await expect(canvas.queryByText(contentText)).not.toBeInTheDocument()
      },
    )

    await step(
      'Popover should be visible after button is clicked',
      async () => {
        await user.click(popoverButton)
        await expect(canvas.queryByText(contentText)).toBeInTheDocument()
      },
    )

    await step(
      'Popover should not be visible after button is clicked twice',
      async () => {
        await user.click(popoverButton)
        await expect(canvas.queryByText(contentText)).not.toBeInTheDocument()
      },
    )

    await step('Popover should close when we click outside', async () => {
      await user.click(popoverButton)
      await expect(canvas.queryByText(contentText)).toBeInTheDocument()

      await user.click(document.body)
      await expect(canvas.queryByText(contentText)).not.toBeInTheDocument()
    })

    await step('Popover should close when we press ESC', async () => {
      await user.click(popoverButton)
      await expect(canvas.queryByText(contentText)).toBeInTheDocument()

      await user.keyboard('[Escape]')
      await expect(canvas.queryByText(contentText)).not.toBeInTheDocument()
    })

    await step('Popover should close when we press SPACE', async () => {
      await user.click(popoverButton)
      await expect(canvas.queryByText(contentText)).toBeInTheDocument()

      await user.keyboard('[Space]')
      await expect(canvas.queryByText(contentText)).not.toBeInTheDocument()
    })

    await step('Popover should close when we press ENTER', async () => {
      await user.click(popoverButton)
      await expect(canvas.queryByText(contentText)).toBeInTheDocument()

      await user.keyboard('[Enter]')
      await expect(canvas.queryByText(contentText)).not.toBeInTheDocument()
    })

    await step(
      'Popover should not close when we click inside the popover',
      async () => {
        await user.click(popoverButton)
        await expect(canvas.queryByText(contentText)).toBeInTheDocument()

        await user.click(canvas.getByText(contentText))
        await expect(canvas.queryByText(contentText)).toBeInTheDocument()
      },
    )

    await step(
      'Popover should have correct id and popovertarget attributes',
      async () => {
        const trigger = canvas.getByRole('button')
        const popover = canvas.getByText(contentText)

        expect(trigger.getAttribute('popovertarget')).toBe(popover.id)
      },
    )
  },
}

export const Controlled: StoryObj<ControlledPopover> = {
  render: (args: any) => ({
    props: args,
    template: `

    <div style="margin: 0 auto; width:100%;  text-align:center;" >
      <ksd-controlled-popover ${argsToTemplate(args)}/>
    </div>
    `,
  }),
}
