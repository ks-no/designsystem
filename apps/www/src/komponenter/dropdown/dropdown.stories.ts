import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { DropdownArgs } from './dropdown.examples'
import * as examples from './dropdown.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'dropdown',
  changes: [
    'I Angular er standardplasseringen top, mens React bruker bottom-end. Sett data-placement for å få samme plassering.',
  ],
  imports: examples.imports,
}

const meta: Meta<DropdownArgs> = {
  title: 'Komponenter/Dropdown',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { 'data-placement': 'bottom-end' },
  argTypes: {
    ...commonArgTypes,
    'data-placement': {
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
      control: { type: 'select' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<DropdownArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedLenker: Story = {
  name: 'Med lenker',
  parameters: { snippets: examples.withLinks },
}
