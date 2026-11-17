import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { literal, html as staticHtml } from 'lit/static-html.js'
import { renderExample } from '../../../.storybook/render'
import * as examples from './heading.examples'

const headingSizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'] as const

type Level = 1 | 2 | 3 | 4 | 5 | 6

type HeadingArgs = {
  /** The tag: h1–h6 in HTML and Angular, `level` in React */
  level: Level
  'data-size'?: (typeof headingSizes)[number]
  label: string
}

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
  argTypes: {
    'data-size': {
      options: [...headingSizes],
      control: { type: 'select' },
    },
  },
  render: renderExample,
  decorators: [
    (story) =>
      html`<div style="display:flex;flex-direction:column;gap:var(--ds-size-4)">
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<HeadingArgs>

// Fixed tag names: lit can't bind a tag name, and these never come from the Controls
const tags = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
  5: literal`h5`,
  6: literal`h6`,
}

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { level: 2, 'data-size': 'md', label: 'Søknad om barnehageplass' },
  argTypes: {
    level: { options: [1, 2, 3, 4, 5, 6], control: { type: 'select' } },
    label: { control: 'text' },
  },
  render: (a) => {
    const tag = tags[a.level] ?? tags[2]
    return staticHtml`<${tag}
      class="ds-heading"
      data-size=${ifDefined(a['data-size'])}
    >${a.label}</${tag}>`
  },
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Storrelser: Story = {
  name: 'Størrelser',
  parameters: { snippets: examples.sizes },
}
export const NivaOgStorrelse: Story = {
  name: 'Nivå og størrelse',
  parameters: { snippets: examples.levelAndSize },
}
