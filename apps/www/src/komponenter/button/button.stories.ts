import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './button.examples'

type ButtonArgs = {
  label: string
  'data-variant'?: 'primary' | 'secondary' | 'tertiary'
  'data-size'?: string
  'data-color'?: string
  loading?: boolean
  disabled?: boolean
  /** Icon only: the label becomes the `aria-label` */
  icon?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'button',
  imports: examples.imports,
}

const meta: Meta<ButtonArgs> = {
  title: 'Komponenter/Button',
  parameters: {
    ksd,
    // The framework tabs replace Storybook's "Show code"
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
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

type Story = StoryObj<ButtonArgs>

const spinner = html`<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-hidden="true"
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
</svg>`

const heart = html`<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 256 256"
  fill="currentColor"
>
  <path
    d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"
  ></path>
</svg>`

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    label: 'Knapp',
    'data-variant': 'primary',
    loading: false,
    disabled: false,
  },
  argTypes: {
    'data-variant': {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
    icon: { control: 'boolean' },
  },
  render: (a) =>
    html`<button
      class="ds-button"
      type="button"
      data-variant=${ifDefined(a['data-variant'])}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
      ?data-icon=${a.icon}
      aria-label=${ifDefined(a.icon ? a.label : undefined)}
      aria-busy=${ifDefined(a.loading ? 'true' : undefined)}
      ?disabled=${a.disabled}
    >
      ${a.loading ? spinner : nothing}
      ${a.icon ? (a.loading ? nothing : heart) : a.label}
    </button>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

export const Variants: Story = {
  parameters: { snippets: examples.variants },
}

export const Icons: Story = {
  ...controls,
  args: { ...controls.args, icon: true, label: 'Legg til i favoritter' },
  parameters: { snippets: examples.icons },
}

export const Loading: Story = {
  ...controls,
  args: { ...controls.args, loading: true, label: 'Lagrer…' },
  parameters: { snippets: examples.loading },
}
