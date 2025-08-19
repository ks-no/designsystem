import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { expect } from 'storybook/test'
import { StorybookArgsWithCommonInputs } from '../../../.storybook/default-args'
import { Field } from '../field/field'
import { Label } from '../label/label'
import { Input } from './input'

const meta: Meta<Input> = {
  component: Input,
  title: 'Komponenter/Input',
  decorators: [
    moduleMetadata({
      imports: [Label, Field, Input],
    }),
  ],
}
export default meta
type Story = StoryObj<Input>

export const Preview: Story = {
  args: {
    readonly: false,
    disabled: false,
    'data-size': 'md',
  } as StorybookArgsWithCommonInputs<Input>,

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input ksd-input ${argsToTemplate(args)}  />
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
          <textarea ksd-input type="text" rows="4" ${argsToTemplate(args)} ></textarea>
        </ksd-field>
    `,
  }),
}

export const Counter: Story = {
  args: {
    ...Preview.args,
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
