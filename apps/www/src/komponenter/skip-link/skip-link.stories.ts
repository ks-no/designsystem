import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { SkipLinkArgs } from './skip-link.examples'
import * as examples from './skip-link.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'skip-link',
  imports: examples.imports,
}

const meta: Meta<SkipLinkArgs> = {
  title: 'Komponenter/Skip Link',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { label: 'Hopp til hovedinnhold' },
  argTypes: { label: { control: 'text' } },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  // The link is hidden until it gets focus
  decorators: [
    (story) =>
      `<p class="ds-paragraph" data-size="sm">Klikk her og trykk Tab for å vise lenken.</p>${story()}`,
  ],
}
export default meta

type Story = StoryObj<SkipLinkArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
