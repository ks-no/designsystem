import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { BadgeArgs } from './badge.examples'
import * as examples from './badge.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'badge',
  imports: examples.imports,
}

const meta: Meta<BadgeArgs> = {
  title: 'Komponenter/Badge',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { count: 5, maxCount: 99, 'data-variant': 'base' },
  argTypes: {
    ...commonArgTypes,
    count: { control: { type: 'number', min: 0 } },
    maxCount: { control: { type: 'number', min: 1 } },
    'data-variant': {
      options: ['base', 'tinted'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<BadgeArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Plassering: Story = {
  parameters: { snippets: examples.placement },
}
