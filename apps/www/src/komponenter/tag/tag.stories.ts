import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './tag.examples'

type TagArgs = {
  label: string
  'data-variant'?: 'default' | 'outline'
  'data-size'?: string
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'tag',
  imports: examples.imports,
}

const meta: Meta<TagArgs> = {
  title: 'Komponenter/Tag',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
  decorators: [
    (story) =>
      html`<div style="display:flex;flex-wrap:wrap;gap:var(--ds-size-2)">
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<TagArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Ny', 'data-variant': 'default' },
  argTypes: {
    'data-variant': {
      options: ['default', 'outline'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
  },
  render: (a) =>
    html`<span
      class="ds-tag"
      data-variant=${ifDefined(a['data-variant'])}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
      >${a.label}</span
    >`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Varianter: Story = { parameters: { snippets: examples.variants } }
