import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { ValidationMessageArgs } from './validation-message.examples'
import * as examples from './validation-message.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'validation-message',
  imports: examples.imports,
}

const meta: Meta<ValidationMessageArgs> = {
  title: 'Komponenter/Validation Message',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { text: 'Fyll inn saksnummer.' },
  argTypes: {
    'data-color': {
      options: ['danger', 'success', 'warning', 'info'],
      control: { type: 'radio' },
    },
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    text: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<ValidationMessageArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const IEtFelt: Story = {
  name: 'I et felt',
  parameters: { snippets: examples.inField },
}
