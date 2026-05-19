import { Button } from '@ks-digital/designsystem-angular/button'
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Dropdown } from './dropdown'

type DropdownArgs = CommonArgs & {
  'data-variant': 'default' | 'tinted'
  'data-placement': 'top' | 'bottom' | 'left' | 'right'
}

const meta: Meta<DropdownArgs> = {
  component: Dropdown,
  decorators: [
    moduleMetadata({
      imports: [Button],
    }),
  ],
  title: 'Dropdown',
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
type Story = StoryObj<Dropdown>

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
    <div style="margin: 0 auto; width:100%; text-align:center;" >
    
    </div>
    `,
  }),
}
