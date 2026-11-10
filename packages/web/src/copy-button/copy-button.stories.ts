import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
// Registers the behaviour for [data-copy]
import './copy-button'
import type { CopyButtonArgs } from './copy-button.examples'
import * as examples from './copy-button.examples'

const ksd: KsdDocsParameters = {
  origin: 'ks',
  source: 'packages/web/src/copy-button',
  imports: examples.imports,
}

const meta: Meta<CopyButtonArgs> = {
  title: 'Copy Button',
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: {
    value: '2026/01482-7',
    text: '',
    variant: 'tertiary',
    copyLabel: 'Kopier',
    copiedLabel: 'Kopiert',
  },
  argTypes: {
    value: { control: 'text' },
    text: { control: 'text' },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    copyLabel: { control: 'text' },
    copiedLabel: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}

export default meta

type Story = StoryObj<CopyButtonArgs>

export const Preview: Story = {
  parameters: { snippets: examples.preview },
}

export const IconOnly: Story = {
  args: { variant: 'secondary', copyLabel: 'Kopier' },
  parameters: { snippets: examples.single },
}

export const IconAndText: Story = {
  args: {
    value: 'https://designsystem.ks.no/copy-button',
    text: 'Kopier lenke',
    variant: 'secondary',
    copyLabel: 'Kopier lenke til denne siden',
  },
  parameters: { snippets: examples.single },
}
