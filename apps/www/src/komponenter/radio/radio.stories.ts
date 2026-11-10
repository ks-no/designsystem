import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { RadioArgs } from './radio.examples'
import * as examples from './radio.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'radio',
  imports: examples.imports,
}

const meta: Meta<RadioArgs> = {
  title: 'Komponenter/Radio',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { legend: 'Hvordan vil du få svar på søknaden?', disabled: false },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    'data-variant': { options: ['outline'], control: { type: 'radio' } },
    legend: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<RadioArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedFeilmelding: Story = {
  name: 'Med feilmelding',
  parameters: { snippets: examples.withError },
}
export const PaSammeLinje: Story = {
  name: 'På samme linje',
  parameters: { snippets: examples.inline },
}
