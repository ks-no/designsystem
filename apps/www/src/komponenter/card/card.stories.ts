import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { CardArgs } from './card.examples'
import * as examples from './card.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'card',
  source: 'packages/angular/card/src',
  imports: examples.imports,
}

const meta: Meta<CardArgs> = {
  title: 'Komponenter/Card',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { variant: 'default' },
  argTypes: {
    ...commonArgTypes,
    variant: {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [(story) => `<div style="max-width:22rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<CardArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedLenke: Story = {
  name: 'Med lenke',
  parameters: { snippets: examples.withLink },
}
export const MedBlokker: Story = {
  name: 'Med blokker',
  parameters: { snippets: examples.withBlocks },
}
