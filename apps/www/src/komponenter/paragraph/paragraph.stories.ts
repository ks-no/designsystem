import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { ParagraphArgs } from './paragraph.examples'
import * as examples from './paragraph.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'paragraph',
  imports: examples.imports,
}

const meta: Meta<ParagraphArgs> = {
  title: 'Komponenter/Paragraph',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    'data-variant': 'default',
    label:
      'Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars.',
  },
  argTypes: {
    'data-variant': {
      options: ['default', 'long', 'short'],
      control: { type: 'radio' },
    },
    'data-size': {
      options: [...examples.paragraphSizes],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-direction:column;gap:var(--ds-size-4);max-width:40rem">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<ParagraphArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Varianter: Story = { parameters: { snippets: examples.variants } }
