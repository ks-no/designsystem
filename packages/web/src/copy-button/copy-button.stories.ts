import type { Meta, StoryObj } from '@storybook/web-components-vite'
import './copy-button'

type CopyButtonArgs = {
  value: string
  label: string
  variant: 'primary' | 'secondary' | 'tertiary'
  copyLabel: string
  copiedLabel: string
  errorLabel: string
  disabled: boolean
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const copyButton = ({
  value,
  label,
  variant,
  copyLabel,
  copiedLabel,
  errorLabel,
  disabled,
}: CopyButtonArgs) => `
  <button
    class="ds-button"
    data-variant="${variant}"
    ${label ? '' : 'data-icon'}
    data-copy="${esc(value)}"
    data-copy-label="${esc(copyLabel)}"
    data-copied-label="${esc(copiedLabel)}"
    data-error-label="${esc(errorLabel)}"
    ${disabled ? 'disabled' : ''}
  >${esc(label)}</button>`

const meta: Meta<CopyButtonArgs> = {
  title: 'Copy Button',
  args: {
    value: '2026/01482-7',
    label: '',
    variant: 'tertiary',
    copyLabel: 'Kopier',
    copiedLabel: 'Kopiert',
    errorLabel: 'Kopiering feilet',
    disabled: false,
  },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    copyLabel: { control: 'text' },
    copiedLabel: { control: 'text' },
    errorLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<CopyButtonArgs>

export const Preview: Story = {
  render: (args) => `
    <p
      class="ds-paragraph"
      style="display:flex;align-items:center;gap:var(--ds-size-2)"
    >
      Saksnummer <strong>${esc(args.value)}</strong>
      ${copyButton(args)}
    </p>`,
}

export const IconOnly: Story = {
  args: { variant: 'secondary', copyLabel: 'Kopier' },
  render: copyButton,
}

export const WithLabel: Story = {
  args: {
    value: 'https://designsystem.ks.no/copy-button',
    label: 'Kopier lenke',
    variant: 'secondary',
    copyLabel: 'Kopier lenke til denne siden',
  },
  render: copyButton,
}
