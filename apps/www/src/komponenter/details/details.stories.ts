import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './details.examples'

type DetailsArgs = {
  'data-variant'?: 'default' | 'tinted'
  'data-size'?: string
  'data-color'?: string
  summary: string
  content: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'details',
  imports: examples.imports,
}

const meta: Meta<DetailsArgs> = {
  title: 'Komponenter/Details',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<DetailsArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    summary: 'Hvilke vedlegg må jeg sende med?',
    content:
      'Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.',
  },
  argTypes: {
    'data-variant': {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    summary: { control: 'text' },
    content: { control: 'text' },
  },
  render: (a) =>
    html`<details
      class="ds-details"
      data-variant=${ifDefined(a['data-variant'])}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      <summary>${a.summary}</summary>
      <div>${a.content}</div>
    </details>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const FlereEtterHverandre: Story = {
  name: 'Flere etter hverandre',
  parameters: { snippets: examples.several },
}
export const IKort: Story = {
  name: 'I kort',
  parameters: { snippets: examples.inCard },
}
export const IKortMedFarge: Story = {
  name: 'I kort med farge',
  decorators: [
    (story) =>
      html`<div style="display:flex;flex-direction:column;gap:var(--ds-size-4)">
        ${story()}
      </div>`,
  ],
  parameters: { snippets: examples.inCardWithColor },
}
