import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { Field } from '../field/field'
import { Input } from '../input/input'

import { Label } from '../label/label'

const meta: Meta<Input> = {
  component: Input,
  title: 'Komponenter/Textarea',
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
