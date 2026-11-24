import { renderExample } from '@internal/docs/render'
import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import * as examples from './kommunevaapen.examples'

type KommunevaapenArgs = {
  /** Kommunenummeret, f.eks. `1502` */
  kommunenummer: string
  /** Tom når bildet er pynt, f.eks. ved siden av kommunenavnet */
  alt: string
}

// Images on KS' CDN, so there's no source in this repo to link to
const ksd: KsdDocsParameters = { origin: 'ks' }

const meta: Meta<KommunevaapenArgs> = {
  title: 'Kommunevåpen',
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  render: renderExample,
}
export default meta

type Story = StoryObj<KommunevaapenArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { kommunenummer: '1502', alt: '' },
  argTypes: {
    kommunenummer: { control: 'text' },
    alt: { control: 'text' },
  },
  render: (a) =>
    html`<img
      alt=${a.alt}
      src="https://static.fiks.ks.no/img/kommunevaapen/${a.kommunenummer}.png"
    />`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
