import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { ChipArgs } from './chip.examples'
import * as examples from './chip.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'chip',
  imports: examples.imports,
}

const meta: Meta<ChipArgs> = {
  title: 'Komponenter/Chip',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: { ...commonArgTypes },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-wrap:wrap;gap:var(--ds-size-2)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<ChipArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const EttValg: Story = {
  name: 'Ett valg',
  parameters: { snippets: examples.radio },
}
export const Fjernbar: Story = { parameters: { snippets: examples.removable } }
