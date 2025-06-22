import type { Meta, StoryObj } from '@storybook/angular'
import { Fieldset } from './fieldset'
import { expect } from 'storybook/test'

const meta: Meta<Fieldset> = {
  component: Fieldset,
  title: 'Fieldset',
}
export default meta
type Story = StoryObj<Fieldset>

export const Primary: Story = {
  args: {},
}

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/fieldset works!/gi)).toBeTruthy()
  },
}
