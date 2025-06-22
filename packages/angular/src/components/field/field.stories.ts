import type { Meta, StoryObj } from '@storybook/angular'
import { Field } from './field'
import { expect } from 'storybook/test'

const meta: Meta<Field> = {
  component: Field,
  title: 'Field',
}
export default meta
type Story = StoryObj<Field>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/field works!/gi)).toBeTruthy()
  },
}
