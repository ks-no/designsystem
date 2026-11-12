import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderExample } from '../../../.storybook/render'
import * as examples from './tooltip.examples'

type TooltipArgs = {
  content: string
  'data-placement'?: 'top' | 'bottom' | 'left' | 'right'
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'tooltip',
  imports: examples.imports,
}

const meta: Meta<TooltipArgs> = {
  title: 'Komponenter/Tooltip',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  render: renderExample,
}
export default meta

type Story = StoryObj<TooltipArgs>

const copyIcon = html`<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 0 256 256"
  fill="currentColor"
>
  <path
    d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"
  ></path>
</svg>`

/**
 * The preview follows the Controls; the code below it stays the static example.
 * Without text, the tooltip becomes the button's name (aria-label).
 */
const controls: Story = {
  args: { content: 'Kopier saksnummer', 'data-placement': 'top' },
  argTypes: {
    content: { control: 'text' },
    'data-placement': {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  render: (a) =>
    html`<button
      class="ds-button"
      type="button"
      data-variant="tertiary"
      data-icon
      data-tooltip=${a.content}
      data-placement=${ifDefined(a['data-placement'])}
    >
      ${copyIcon}
    </button>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

/** With text, the tooltip becomes the button's description (aria-description) */
export const SomBeskrivelse: Story = {
  ...controls,
  name: 'Som beskrivelse',
  args: { ...controls.args, content: 'Utkastet lagres i 30 dager' },
  render: (a) =>
    html`<button
      class="ds-button"
      type="button"
      data-variant="secondary"
      data-tooltip=${a.content}
      data-placement=${ifDefined(a['data-placement'])}
    >
      Lagre utkast
    </button>`,
  parameters: { snippets: examples.description },
}
