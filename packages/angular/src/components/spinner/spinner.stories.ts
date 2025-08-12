import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { StorybookArgsWithCommonInputs } from '../../utils/default-args'
import { Spinner } from './spinner'

const meta: Meta<Spinner> = {
  component: Spinner,
  title: 'Komponenter/Loaders/Spinner',
  decorators: [
    moduleMetadata({
      imports: [Spinner],
    }),
  ],
}
export default meta
type Story = StoryObj<Spinner>

export const Preview: Story = {
  args: {
    ariaLabel: undefined,
    'data-size': 'md',
    'data-color': undefined,
  } as StorybookArgsWithCommonInputs<Spinner>,

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
  } as StorybookArgsWithCommonInputs<Spinner>,
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
