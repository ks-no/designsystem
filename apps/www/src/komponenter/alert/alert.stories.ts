import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { AlertArgs } from './alert.examples'
import * as examples from './alert.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'alert',
  imports: examples.imports,
}

const meta: Meta<AlertArgs> = {
  title: 'Komponenter/Alert',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    'data-color': 'info',
    heading: 'Søknadsfristen er 1. mars',
    body: 'Søknader som kommer inn etter fristen blir ikke behandlet.',
  },
  argTypes: {
    'data-color': {
      options: ['info', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    heading: { control: 'text' },
    body: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<AlertArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const BareTekst: Story = {
  name: 'Bare tekst',
  parameters: { snippets: examples.textOnly },
}
