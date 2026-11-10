import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { TooltipArgs } from './tooltip.examples'
import * as examples from './tooltip.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'tooltip',
  imports: examples.imports,
}

const meta: Meta<TooltipArgs> = {
  title: 'Komponenter/Tooltip',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { content: 'Kopier saksnummer', 'data-placement': 'top' },
  argTypes: {
    content: { control: 'text' },
    'data-placement': {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<TooltipArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const SomBeskrivelse: Story = {
  name: 'Som beskrivelse',
  parameters: { snippets: examples.description },
}
