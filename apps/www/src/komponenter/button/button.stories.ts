import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { ButtonArgs } from './button.examples'
import * as examples from './button.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'button',
  imports: examples.imports,
}

const meta: Meta<ButtonArgs> = {
  title: 'Komponenter/Button',
  parameters: {
    ksd,
    // The framework tabs replace Storybook's "Show code"
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    label: 'Knapp',
    'data-variant': 'primary',
    loading: false,
    disabled: false,
  },
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--ds-size-4)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<ButtonArgs>

export const Preview: Story = {
  parameters: { snippets: examples.preview },
}

export const Variants: Story = {
  parameters: { snippets: examples.variants },
}

export const Icons: Story = {
  parameters: { snippets: examples.icons },
}

export const Loading: Story = {
  parameters: { snippets: examples.loading },
}
