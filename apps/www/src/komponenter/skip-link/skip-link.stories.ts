import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { renderExample } from '../../../.storybook/render'
import * as examples from './skip-link.examples'

type SkipLinkArgs = {
  label: string
}

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
  render: renderExample,
  // The link is hidden until it gets focus
  decorators: [
    (story) =>
      html`<p class="ds-paragraph" data-size="sm">
          Klikk her og trykk Tab for å vise lenken.
        </p>
        ${story()}`,
  ],
}
export default meta

type Story = StoryObj<SkipLinkArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Hopp til hovedinnhold' },
  argTypes: { label: { control: 'text' } },
  // First on the page, so it's the first thing Tab reaches
  render: (a) =>
    html`<a class="ds-skip-link" href="#hovedinnhold">${a.label}</a>
      <main id="hovedinnhold" tabindex="-1">Hovedinnholdet på siden</main>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
