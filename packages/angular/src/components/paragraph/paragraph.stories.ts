import type { Meta, StoryObj } from '@storybook/angular'
import { Paragraph } from './paragraph'
import { expect } from 'storybook/test'

const meta: Meta<Paragraph> = {
  component: Paragraph,
  title: 'Paragraph',
}
export default meta
type Story = StoryObj<Paragraph>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/paragraph works!/gi)).toBeTruthy()
  },
}
