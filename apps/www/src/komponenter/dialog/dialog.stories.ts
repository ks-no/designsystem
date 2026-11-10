import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { DialogArgs } from './dialog.examples'
import * as examples from './dialog.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'dialog',
  imports: examples.imports,
}

const meta: Meta<DialogArgs> = {
  title: 'Komponenter/Dialog',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: {
    closedby: {
      options: ['any', 'closerequest', 'none'],
      control: { type: 'radio' },
    },
    'data-placement': {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<DialogArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const IkkeModal: Story = {
  name: 'Ikke-modal',
  parameters: { snippets: examples.nonModal },
}
