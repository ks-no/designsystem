import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { themeColors } from '../../../.storybook/args'
import type { SpinnerArgs } from './spinner.examples'
import * as examples from './spinner.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'spinner',
  imports: examples.imports,
}

const meta: Meta<SpinnerArgs> = {
  title: 'Komponenter/Spinner',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { 'aria-label': 'Laster inn' },
  argTypes: {
    'data-size': {
      options: [...examples.spinnerSizes],
      control: { type: 'radio' },
    },
    'data-color': {
      options: [...themeColors],
      control: { type: 'radio' },
    },
    'aria-label': { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--ds-size-4)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<SpinnerArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Storrelser: Story = {
  name: 'Størrelser',
  parameters: { snippets: examples.sizes },
}
export const MedTekst: Story = {
  name: 'Med tekst',
  parameters: { snippets: examples.withText },
}
