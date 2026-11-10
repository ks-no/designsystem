import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { TextfieldArgs } from './textfield.examples'
import * as examples from './textfield.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'textfield',
  imports: examples.imports,
}

const meta: Meta<TextfieldArgs> = {
  title: 'Komponenter/Textfield',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    label: 'Saksnummer',
    description: 'Står øverst i brevet du fikk fra kommunen.',
    error: '',
  },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<TextfieldArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const FlereLinjer: Story = {
  name: 'Flere linjer',
  parameters: { snippets: examples.multiline },
}
