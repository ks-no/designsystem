import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { DetailsArgs } from './details.examples'
import * as examples from './details.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'details',
  imports: examples.imports,
}

const meta: Meta<DetailsArgs> = {
  title: 'Komponenter/Details',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    summary: 'Hvilke vedlegg må jeg sende med?',
    content:
      'Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.',
  },
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    summary: { control: 'text' },
    content: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<DetailsArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const FlereEtterHverandre: Story = {
  name: 'Flere etter hverandre',
  parameters: { snippets: examples.several },
}
