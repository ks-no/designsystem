import type { Meta, StoryObj } from '@storybook/angular'
import { Label } from './label'
import { expect } from 'storybook/test'

const meta: Meta<Label> = {
  component: Label,
  title: 'Label',
}
export default meta
type Story = StoryObj<Label>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/label works!/gi)).toBeTruthy()
  },
}
