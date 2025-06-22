import type { Meta, StoryObj } from '@storybook/angular'
import { ValidationMessage } from './validation-message'
import { expect } from 'storybook/test'

const meta: Meta<ValidationMessage> = {
  component: ValidationMessage,
  title: 'ValidationMessage',
}
export default meta
type Story = StoryObj<ValidationMessage>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/validation-message works!/gi)).toBeTruthy()
  },
}
