import { Button } from '@ks-digital/designsystem-angular/button'
import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Popover } from './popover'

type PopoverArgs = CommonArgs & {
  'data-variant': 'default' | 'tinted'
  'data-placement': 'top' | 'bottom' | 'left' | 'right'
}

const meta: Meta<PopoverArgs> = {
  component: Popover,
  decorators: [
    moduleMetadata({
      imports: [Button],
    }),
  ],
  title: 'Komponenter/Popover',
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    'data-placement': {
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
      <p ksd-popover id="my-popover"  ${argsToTemplate(args)}> Her er det noe innhold </p>
    </div>
    `,
  }),
}
