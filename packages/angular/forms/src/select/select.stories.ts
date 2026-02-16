import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Field } from '../field'
import { Input } from '../input'
import { Label } from '../label'

type InputArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<InputArgs> = {
  component: Input,
  title: 'Komponenter/Forms/Select',
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
            <select ksd-input ${argsToTemplate(args)}>
              <option value="" disabled="" selected="">Velg et fjell …</option>
              <option value="everest">Mount Everest</option>
              <option value="aconcagua">Aconcagua</option>
              <option value="denali">Denali</option>
              <option value="kilimanjaro">Kilimanjaro</option>
              <option value="elbrus">Elbrus</option>
              <option value="vinson">Mount Vinson</option>
              <option value="puncakjaya">Puncak Jaya</option>
              <option value="kosciuszko">Mount Kosciuszko</option>
            </select>
        </ksd-field>
    `,
  }),
}
