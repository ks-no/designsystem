import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './copy-button'

type CopyButtonArgs = {
  value: string
  text: string
  variant: 'primary' | 'secondary' | 'tertiary'
  copyLabel: string
  copiedLabel: string
}

const copyButton = ({
  value,
  text,
  variant,
  copyLabel,
  copiedLabel,
}: CopyButtonArgs) =>
  html`<button
    class="ds-button"
    data-variant=${variant}
    ?data-icon=${!text}
    data-copy=${value}
    data-copy-label=${copyLabel}
    data-copied-label=${copiedLabel}
  >
    ${text}
  </button>`

const meta: Meta<CopyButtonArgs> = {
  title: 'Copy Button',
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
}

export default meta

type Story = StoryObj<CopyButtonArgs>

export const Preview: Story = {
  render: (args) =>
    html`<p
      class="ds-paragraph"
      style="display:flex;align-items:center;gap:var(--ds-size-2)"
    >
      Saksnummer <strong>${args.value}</strong>
      ${copyButton(args)}
    </p>`,
}

export const IconOnly: Story = {
  args: { variant: 'secondary', copyLabel: 'Kopier' },
  render: copyButton,
}

export const IconAndText: Story = {
  args: {
    value: 'https://designsystem.ks.no/copy-button',
    text: 'Kopier lenke',
    variant: 'secondary',
    copyLabel: 'Kopier lenke til denne siden',
  },
  render: copyButton,
}
