import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { SearchArgs } from './search.examples'
import * as examples from './search.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'search',
  imports: examples.imports,
}

const meta: Meta<SearchArgs> = {
  title: 'Komponenter/Search',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { label: 'Søk', buttonLabel: 'Søk', variant: 'primary' },
  argTypes: {
    ...commonArgTypes,
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<SearchArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedIkon: Story = {
  name: 'Med ikon',
  parameters: { snippets: examples.withIcon },
}
export const MedLabel: Story = {
  name: 'Med label',
  parameters: { snippets: examples.withLabel },
}
