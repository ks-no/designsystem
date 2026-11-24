import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderExample } from '../../../.storybook/render'
import * as examples from './paragraph.examples'

const paragraphSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

type ParagraphArgs = {
  'data-variant'?: 'default' | 'long' | 'short'
  'data-size'?: (typeof paragraphSizes)[number]
  label: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'paragraph',
  imports: examples.imports,
}

const meta: Meta<ParagraphArgs> = {
  title: 'Komponenter/Paragraph',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: {
    'data-size': {
      options: [...paragraphSizes],
      control: { type: 'radio' },
    },
  },
  render: renderExample,
  decorators: [
    (story) =>
      html`<div
        style="display:flex;flex-direction:column;gap:var(--ds-size-4);max-width:40rem"
      >
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<ParagraphArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    'data-variant': 'default',
    label:
      'Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars.',
  },
  argTypes: {
    'data-variant': {
      options: ['default', 'long', 'short'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
  },
  render: (a) =>
    html`<p
      class="ds-paragraph"
      data-variant=${ifDefined(a['data-variant'])}
      data-size=${ifDefined(a['data-size'])}
    >
      ${a.label}
    </p>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Varianter: Story = { parameters: { snippets: examples.variants } }
