import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Field } from '../field'
import { Label } from '../label'
import { Input } from './input'

type InputArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<InputArgs> = {
  component: Input,
  title: 'Komponenter/Forms/Input',
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
      imports: [Label, Field, Input],
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
          <input ksd-input type="text" ${argsToTemplate(args)} />
          <p class="ds-validation-message" data-field="counter" data-limit="5" data-over="%d tegn for mye" data-under="%d tegn igjen" data-hint="Maks %d tegn tillatt."></p>
        </ksd-field>
    `,
  }),
}
