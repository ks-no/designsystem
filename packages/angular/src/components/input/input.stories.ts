import { JsonPipe } from '@angular/common'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { expect } from 'storybook/test'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Field } from '../field/field'
import { Label } from '../label/label'
import { Input } from './input'

type InputArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<InputArgs> = {
  component: Input,
  title: 'Komponenter/Input',
  argTypes: {
    ...commonArgTypes,
    readonly: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Label, Field, Input, JsonPipe],
    }),
  ],
}
export default meta
type Story = StoryObj<InputArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input ${argsToTemplate(args)} ksd-input  />
        </ksd-field>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox')).toBeTruthy()
  },
}

export const Rows: Story = {
  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <textarea ksd-input type="text" rows="4" ${argsToTemplate(args)} ></textarea>
        </ksd-field>
    `,
  }),
}

export const Counter: Story = {
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
