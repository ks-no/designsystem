import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './tabs.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'tabs',
  imports: examples.imports,
}

const meta: Meta = {
  title: 'Komponenter/Tabs',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedIkoner: Story = {
  name: 'Med ikoner',
  parameters: { snippets: examples.withIcons },
}
