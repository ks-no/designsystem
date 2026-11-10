import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { PopoverArgs } from './popover.examples'
import * as examples from './popover.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'popover',
  imports: examples.imports,
}

const meta: Meta<PopoverArgs> = {
  title: 'Komponenter/Popover',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: {
    content: 'Saksnummeret står øverst i brevet du fikk fra kommunen.',
    'data-placement': 'top',
  },
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    'data-placement': {
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      control: { type: 'select' },
    },
    content: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<PopoverArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedHandlinger: Story = {
  name: 'Med handlinger',
  parameters: { snippets: examples.withActions },
}
