import { JsonPipe } from '@angular/common'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { expect } from 'storybook/test'
import { Field } from '../field/field'
import { FieldCounter } from '../field/field-counter'
import { Input } from '../input/input'
import { Label } from '../label/label'

const meta: Meta<Input> = {
  component: Input,
  title: 'Input',
  decorators: [
    moduleMetadata({
      imports: [Label, Field, Input, FieldCounter, JsonPipe],
    }),
  ],
}
export default meta
type Story = StoryObj<Input>

export const Preview: Story = {
  args: {
    readonly: false,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input ksd-input type="text" ${argsToTemplate(args)} />
        </ksd-field>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox')).toBeTruthy()
  },
}

export const Rows: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <textarea ksd-input type="text" rows="4" ${argsToTemplate(args)}></textarea>
        </ksd-field>
    `,
  }),
}

export const Counter: Story = {
  args: {
    ...Preview.args,
    counter: 5,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input ksd-input [counter]="5" type="text" ${argsToTemplate(args)} />
        </ksd-field>
    `,
  }),
}
