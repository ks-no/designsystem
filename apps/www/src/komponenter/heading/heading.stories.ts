import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { HeadingArgs } from './heading.examples'
import * as examples from './heading.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'heading',
  imports: examples.imports,
}

const meta: Meta<HeadingArgs> = {
  title: 'Komponenter/Heading',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { level: 2, 'data-size': 'md', label: 'Søknad om barnehageplass' },
  argTypes: {
    level: { options: [1, 2, 3, 4, 5, 6], control: { type: 'select' } },
    'data-size': {
      options: [...examples.headingSizes],
      control: { type: 'select' },
    },
    label: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-direction:column;gap:var(--ds-size-4)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<HeadingArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Storrelser: Story = {
  name: 'Størrelser',
  parameters: { snippets: examples.sizes },
}
export const NivaOgStorrelse: Story = {
  name: 'Nivå og størrelse',
  parameters: { snippets: examples.levelAndSize },
}
