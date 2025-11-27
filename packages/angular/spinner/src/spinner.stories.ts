import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../.storybook/default-args'
import { Spinner } from './spinner'

type SpinnerArgs = CommonArgs

const meta: Meta<SpinnerArgs> = {
  component: Spinner,
  title: 'Komponenter/Loaders/Spinner',
  decorators: [
    moduleMetadata({
      imports: [Spinner],
    }),
  ],
}
export default meta
type Story = StoryObj<SpinnerArgs>

export const Preview: Story = {
  args: {
    'data-size': 'md',
    'data-color': undefined,
  },

  render: (args) => ({
    props: args,
    template: `
      <ksd-spinner ${argsToTemplate(args)} data-size="xl" />
    `,
  }),
}

export const Sizes: Story = {
  args: {
    ...Preview.args,
    'data-size': undefined,
  },
  render: (args) => ({
    props: args,
    template: `
      <ksd-spinner aria-label="Laster" ${argsToTemplate(args)} data-size="2xs"  />
      <ksd-spinner aria-label="Laster" ${argsToTemplate(args)} data-size="xs" />
      <ksd-spinner aria-label="Laster" ${argsToTemplate(args)} data-size="sm" />
      <ksd-spinner aria-label="Laster" ${argsToTemplate(args)} data-size="md" />
      <ksd-spinner aria-label="Laster" ${argsToTemplate(args)} data-size="lg" />
      <ksd-spinner aria-label="Laster" ${argsToTemplate(args)} data-size="xl" />
    `,
  }),
}
