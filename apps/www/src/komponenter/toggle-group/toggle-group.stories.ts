import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { ToggleGroupArgs } from './toggle-group.examples'
import * as examples from './toggle-group.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'toggle-group',
  imports: examples.imports,
}

const meta: Meta<ToggleGroupArgs> = {
  title: 'Komponenter/Toggle Group',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-direction:column;align-items:center;gap:var(--ds-size-4)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<ToggleGroupArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Varianter: Story = { parameters: { snippets: examples.variants } }
