import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { FieldArgs } from './field.examples'
import * as examples from './field.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'field',
  imports: examples.imports,
}

const meta: Meta<FieldArgs> = {
  title: 'Komponenter/Field',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    label: 'Etternavn',
    description: 'Slik det står i folkeregisteret.',
  },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<FieldArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedFeilmelding: Story = {
  name: 'Med feilmelding',
  parameters: { snippets: examples.withError },
}
