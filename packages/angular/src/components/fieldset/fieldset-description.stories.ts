import type { Meta, StoryObj } from '@storybook/angular'
import { FieldsetDescription } from './fieldset-description'
import { expect } from 'storybook/test'

const meta: Meta<FieldsetDescription> = {
  component: FieldsetDescription,
  title: 'FieldsetDescription',
}
export default meta
type Story = StoryObj<FieldsetDescription>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/fieldset-description works!/gi)).toBeTruthy()
  },
}
