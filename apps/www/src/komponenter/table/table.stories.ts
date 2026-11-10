import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { TableArgs } from './table.examples'
import * as examples from './table.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'table',
  imports: examples.imports,
}

const meta: Meta<TableArgs> = {
  title: 'Komponenter/Table',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { 'data-zebra': false, 'data-border': false, 'data-hover': false },
  argTypes: {
    'data-zebra': { control: 'boolean' },
    'data-border': { control: 'boolean' },
    'data-hover': { control: 'boolean' },
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<TableArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Sorterbar: Story = { parameters: { snippets: examples.sortable } }
export const FastOverskriftsrad: Story = {
  name: 'Fast overskriftsrad',
  parameters: { snippets: examples.stickyHeader },
}
