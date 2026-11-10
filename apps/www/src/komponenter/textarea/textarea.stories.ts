import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { TextareaArgs } from './textarea.examples'
import * as examples from './textarea.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'textarea',
  imports: examples.imports,
}

const meta: Meta<TextareaArgs> = {
  title: 'Komponenter/Textarea',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { label: 'Begrunnelse', disabled: false, readonly: false },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    label: { control: 'text' },
    rows: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<TextareaArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedTegnteller: Story = {
  name: 'Med tegnteller',
  parameters: { snippets: examples.withCounter },
}
