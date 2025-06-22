import type { Meta, StoryObj } from '@storybook/angular'
import { FieldsetLegend } from './fieldset-legend'
import { expect } from 'storybook/test'

const meta: Meta<FieldsetLegend> = {
  component: FieldsetLegend,
  title: 'FieldsetLegend',
}
export default meta
type Story = StoryObj<FieldsetLegend>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/fieldset-legend works!/gi)).toBeTruthy()
  },
}
