import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { FieldsetArgs } from './fieldset.examples'
import * as examples from './fieldset.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'fieldset',
  imports: examples.imports,
}

const meta: Meta<FieldsetArgs> = {
  title: 'Komponenter/Fieldset',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    legend: 'Adresse',
    description: 'Adressen der du bor nå.',
  },
  argTypes: {
    legend: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<FieldsetArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
