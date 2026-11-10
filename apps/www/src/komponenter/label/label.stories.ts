import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { LabelArgs } from './label.examples'
import * as examples from './label.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'label',
  imports: examples.imports,
}

const meta: Meta<LabelArgs> = {
  title: 'Komponenter/Label',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { label: 'Fullt navn' },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    label: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:22rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<LabelArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
