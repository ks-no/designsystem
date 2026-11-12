import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { themeColors } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './spinner.examples'

const spinnerSizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const

type SpinnerArgs = {
  'aria-label': string
  'data-size'?: (typeof spinnerSizes)[number]
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'spinner',
  imports: examples.imports,
}

const meta: Meta<SpinnerArgs> = {
  title: 'Komponenter/Spinner',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  // Spinner has more sizes than most components
  argTypes: {
    'data-size': {
      options: [...spinnerSizes],
      control: { type: 'radio' },
    },
    'data-color': {
      options: [...themeColors],
      control: { type: 'radio' },
    },
  },
  render: renderExample,
  decorators: [
    (story) =>
      html`<div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--ds-size-4)"
      >
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<SpinnerArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { 'aria-label': 'Laster inn' },
  argTypes: { 'aria-label': { control: 'text' } },
  render: (a) =>
    html`<svg
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
      aria-label=${a['aria-label']}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      <circle
        class="ds-spinner__background"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
      <circle
        class="ds-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Storrelser: Story = {
  name: 'Størrelser',
  parameters: { snippets: examples.sizes },
}
export const MedTekst: Story = {
  name: 'Med tekst',
  parameters: { snippets: examples.withText },
}
