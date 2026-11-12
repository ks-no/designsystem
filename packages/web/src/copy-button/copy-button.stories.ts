import { renderExample } from '@internal/docs/render'
import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './copy-button' // Registers the behaviour for [data-copy]
import * as examples from './copy-button.examples'

type CopyButtonArgs = {
  value: string
  /** Without text the button is square, with the label as its accessible name */
  text: string
  variant: 'primary' | 'secondary' | 'tertiary'
  copyLabel: string
  copiedLabel: string
}

const ksd: KsdDocsParameters = {
  origin: 'ks',
  source: 'packages/web/src/copy-button',
  imports: examples.imports,
}

const meta: Meta<CopyButtonArgs> = {
  title: 'Copy Button',
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  render: renderExample,
}

export default meta

type Story = StoryObj<CopyButtonArgs>

const button = (a: CopyButtonArgs) =>
  html`<button
    class="ds-button"
    type="button"
    data-variant=${a.variant}
    ?data-icon=${!a.text}
    data-copy=${a.value}
    data-copy-label=${a.copyLabel}
    data-copied-label=${a.copiedLabel}
  >
    ${a.text}
  </button>`

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    value: '2026/01482-7',
    text: '',
    variant: 'tertiary',
    copyLabel: 'Kopier',
    copiedLabel: 'Kopiert',
  },
  argTypes: {
    value: { control: 'text' },
    text: { control: 'text' },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    copyLabel: { control: 'text' },
    copiedLabel: { control: 'text' },
  },
  render: (a) =>
    html`<p
      class="ds-paragraph"
      style="display:flex;align-items:center;gap:var(--ds-size-2)"
    >
      Saksnummer
      <strong>${a.value}</strong>
      ${button(a)}
    </p>`,
}

/** Just the button */
const single: Story = { ...controls, render: button }

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

export const IconOnly: Story = {
  ...single,
  args: { ...controls.args, variant: 'secondary', copyLabel: 'Kopier' },
  parameters: { snippets: examples.iconOnly },
}

export const IconAndText: Story = {
  ...single,
  args: {
    ...controls.args,
    value: 'https://designsystem.ks.no/copy-button',
    text: 'Kopier lenke',
    variant: 'secondary',
    copyLabel: 'Kopier lenke til denne siden',
  },
  parameters: { snippets: examples.iconAndText },
}
