import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../../.storybook/default-args'
import { Field } from '../field'
import { Input } from '../input'
import { Label } from '../label'

type TextareaArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<TextareaArgs> = {
  component: Input,
  title: 'Komponenter/Textarea',
  decorators: [
    moduleMetadata({
      imports: [Label, Field, Input],
    }),
  ],
}
export default meta
type Story = StoryObj<TextareaArgs>

export const Preview: Story = {
  args: {
    readonly: false,
    disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
    <div style="
        display: flex;
        flex-direction: column;
        gap: var(--ds-size-2);
        max-width: 100%;
        width: 20rem
      " >
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <textarea ksd-input type="text" ${argsToTemplate(args)}></textarea>
        </ksd-field>
      </div>
    `,
  }),
}
