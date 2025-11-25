import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
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
    ...commonArgTypes,
    variant: {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
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
    <div style="margin: 0 auto; width:100%; text-align:center;" >
      <button ksd-button variant="primary"  popovertarget="my-popover"> Enkel popover </button>
      <ksd-popover popoverId="my-popover"  ${argsToTemplate(args)}> Her er det noe innhold </ksd-popover>
    </div>
    `,
  }),
}

export const Controlled: StoryObj<ControlledPopover> = {
  render: (args) => ({
    props: args,
    template: `

    <div style="margin: 0 auto; width:100%;  text-align:center;" >
      <ksd-controlled-popover ${argsToTemplate(args)}/>
    </div>
    `,
  }),
}
