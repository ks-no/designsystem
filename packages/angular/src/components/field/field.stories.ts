import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { expect } from 'storybook/test'
import { Input } from '../input/input'
import { Label } from '../label/label'
import { Field } from './field'
import { FieldDescription } from './field-description'
import { FieldError } from './field-error'

const meta: Meta<Field> = {
  component: Field,
  title: 'Field',
  decorators: [
    moduleMetadata({
      imports: [Label, Field, Input, FieldError, FieldDescription],
    }),
  ],
}
export default meta
type Story = StoryObj<Input>

export const Preview: Story = {
  args: {
    readonly: false,
    disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Etternavn</ksd-label>
          <div ksd-field-description>Etternavn kan ikke inneholde mellomrom</div>
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

export const Error: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Navn</ksd-label>
          <input ksd-input type="text" ${argsToTemplate(args)} />
          <p ksd-error>Feltet må fylles ut</p>
        </ksd-field>
    `,
  }),
}
