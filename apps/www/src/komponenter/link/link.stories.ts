import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { LinkArgs } from './link.examples'
import * as examples from './link.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'link',
  imports: examples.imports,
}

const meta: Meta<LinkArgs> = {
  title: 'Komponenter/Link',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { label: 'kommunale tjenester', href: '#' },
  argTypes: {
    ...commonArgTypes,
    label: { control: 'text' },
    href: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<LinkArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const ITekst: Story = {
  name: 'I tekst',
  parameters: { snippets: examples.inText },
}
