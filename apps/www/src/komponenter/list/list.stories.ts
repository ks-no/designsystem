import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './list.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'list',
  imports: examples.imports,
}

const meta: Meta = {
  title: 'Komponenter/List',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  render: renderExample,
}
export default meta

type Story = StoryObj

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Nummerert: Story = {
  name: 'Nummerert liste',
  parameters: { snippets: examples.ordered },
}
