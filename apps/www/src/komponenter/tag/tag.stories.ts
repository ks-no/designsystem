import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { TagArgs } from './tag.examples'
import * as examples from './tag.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'tag',
  imports: examples.imports,
}

const meta: Meta<TagArgs> = {
  title: 'Komponenter/Tag',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { label: 'Ny', 'data-variant': 'default' },
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['default', 'outline'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-wrap:wrap;gap:var(--ds-size-2)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<TagArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Varianter: Story = { parameters: { snippets: examples.variants } }
