import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { expect } from 'storybook/test'
import { Field } from '../field/field'
import { Input } from '../input/input'
import { Label } from '../label/label'

const meta: Meta<Input> = {
  component: Input,
  title: 'Textfield',
  decorators: [
    moduleMetadata({
      imports: [Label, Field, Input],
    }),
  ],
}
export default meta
type Story = StoryObj<Input>

export const Preview: Story = {
  args: {},

  render: () => ({
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input ksd-input type="text" />
        </ksd-field>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox')).toBeTruthy()
  },
}

export const Rows: Story = {
  args: {},

  render: () => ({
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <textarea ksd-input type="text" rows="4" ></textarea>
        </ksd-field>
    `,
  }),
}

export const Counter: Story = {
  args: {},

  render: () => ({
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input ksd-input [counter]="5" type="text" />
        </ksd-field>
    `,
  }),
}
