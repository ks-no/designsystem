import type { Meta, StoryObj } from '@storybook/web-components-vite'
import './copy-button'

type CopyButtonArgs = {
  value: string
  copyLabel: string
  copiedLabel: string
  disabled: boolean
}

const meta: Meta<CopyButtonArgs> = {
  title: 'Copy Button',
  component: 'ksd-copy-button',
  args: {
    value: 'Text to copy!',
    copyLabel: 'Kopier',
    copiedLabel: 'Kopiert',
    disabled: false,
  },
  argTypes: {
    value: { control: 'text' },
    copyLabel: { control: 'text' },
    copiedLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<CopyButtonArgs>

export const Primary: Story = {
  render: ({ value, copyLabel, copiedLabel, disabled }) => {
    const disabledAttr = disabled ? 'disabled' : ''
    return `
        <ksd-copy-button class="ds-button" data-variant="secondary" value="${value}" copy-label="${copyLabel}" copied-label="${copiedLabel}" ${disabledAttr}></ksd-copy-button>`
  },
}
