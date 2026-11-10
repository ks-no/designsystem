import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { KommunevaapenArgs } from './kommunevaapen.examples'
import * as examples from './kommunevaapen.examples'

// Images on KS' CDN, so there's no source in this repo to link to
const ksd: KsdDocsParameters = { origin: 'ks' }

const meta: Meta<KommunevaapenArgs> = {
  title: 'Kommunevåpen',
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { kommunenummer: '1502', alt: '' },
  argTypes: {
    kommunenummer: { control: 'text' },
    alt: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<KommunevaapenArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
