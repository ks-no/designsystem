import { Color, Size } from '@ks-digital/designsystem-angular/__internals'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { commonArgTypes } from '../../.storybook/default-args'
import { Spinner } from './spinner'

type SpinnerSizes = Size | 'xs' | 'xl' | '2xs'

type SpinnerArgs = {
  'data-size'?: SpinnerSizes | undefined
  'data-color'?: Color | undefined
}

const meta: Meta<SpinnerArgs> = {
  component: Spinner,
  title: 'Komponenter/Loaders/Spinner',
  decorators: [
    moduleMetadata({
      imports: [Spinner],
    }),
  ],
  argTypes: {
    'data-color': commonArgTypes['data-color'],
    'data-size': {
      options: commonArgTypes['data-size'].options.concat(['xs', '2xs', 'xl']),
      control: commonArgTypes['data-size'].control,
    },
  },
}
export default meta
type Story = StoryObj<SpinnerArgs>

export const Preview: Story = {
  args: { 'data-size': 'md' },
  render: (args) => ({
    props: args,
    template: `
      <ksd-spinner ${argsToTemplate(args)} />
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
