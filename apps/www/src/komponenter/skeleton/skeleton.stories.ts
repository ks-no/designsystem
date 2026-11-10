import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { SkeletonArgs } from './skeleton.examples'
import * as examples from './skeleton.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'skeleton',
  imports: examples.imports,
}

const meta: Meta<SkeletonArgs> = {
  title: 'Komponenter/Skeleton',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { 'data-variant': 'rectangle' },
  argTypes: {
    'data-variant': {
      options: ['rectangle', 'circle', 'text'],
      control: { type: 'radio' },
    },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-direction:column;gap:var(--ds-size-3);max-width:24rem">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<SkeletonArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const LasterInnhold: Story = {
  name: 'Laster innhold',
  parameters: { snippets: examples.loading },
}
