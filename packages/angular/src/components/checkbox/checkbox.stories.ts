import type { Meta, StoryObj } from '@storybook/angular'
import { Checkbox } from './checkbox'
import { expect } from 'storybook/test'

const meta: Meta<Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
}
export default meta
type Story = StoryObj<Checkbox>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/checkbox works!/gi)).toBeTruthy()
  },
}
