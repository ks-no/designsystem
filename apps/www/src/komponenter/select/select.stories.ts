import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { SelectArgs } from './select.examples'
import * as examples from './select.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'select',
  imports: examples.imports,
}

const meta: Meta<SelectArgs> = {
  title: 'Komponenter/Select',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { label: 'Kommune', disabled: false },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<SelectArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedGrupper: Story = {
  name: 'Med grupper',
  parameters: { snippets: examples.groups },
}
