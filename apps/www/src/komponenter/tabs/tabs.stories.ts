import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { TabsArgs } from './tabs.examples'
import * as examples from './tabs.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'tabs',
  imports: examples.imports,
}

const meta: Meta<TabsArgs> = {
  title: 'Komponenter/Tabs',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: { ...commonArgTypes },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<TabsArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
