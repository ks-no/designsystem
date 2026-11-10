import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { InputArgs } from './input.examples'
import * as examples from './input.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'input',
  imports: examples.imports,
}

const meta: Meta<InputArgs> = {
  title: 'Komponenter/Input',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { label: 'E-post', type: 'email', disabled: false, readonly: false },
  argTypes: {
    type: {
      options: ['text', 'email', 'tel', 'number', 'date', 'password'],
      control: { type: 'select' },
    },
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<InputArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Bredde: Story = { parameters: { snippets: examples.width } }
