import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../../.storybook/default-args'
import { Field } from '../field/field'
import { FieldDescription } from '../field/field-description'
import { Fieldset } from '../fieldset/fieldset'
import { FieldsetDescription } from '../fieldset/fieldset-description'
import { FieldsetLegend } from '../fieldset/fieldset-legend'
import { Input } from '../input/input'
import { Label } from '../label/label'
import { ValidationMessage } from '../validation-message'

type SwitchArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<SwitchArgs> = {
  component: Input,
  title: 'Komponenter/Switch',
  decorators: [
    moduleMetadata({
      imports: [
        Label,
        Field,
        Input,
        FieldDescription,
        Fieldset,
        FieldsetLegend,
        FieldsetDescription,
        ValidationMessage,
      ],
    }),
  ],
}
export default meta
type Story = StoryObj<SwitchArgs>

export const Preview: Story = {
  args: {
    readonly: false,
    disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Min switch</ksd-label>
          <input ksd-input role="switch" type="checkbox" ${argsToTemplate(args)} role="switch"/>
        </ksd-field>
    `,
  }),
  // play: async ({ canvas }) => {
  //   await expect(canvas.getByRole('switch')).toBeTruthy()
  // },
}

export const Grouped: Story = {
  render: () => ({
    template: `
      <fieldset ksd-fieldset>
        <legend ksd-fieldset-legend> Skru av/på lys </legend>
        <ksd-field>
          <ksd-label>Stue</ksd-label>
          <input ksd-input  type="checkbox" role="switch" checked=${true} />
        </ksd-field>
        <ksd-field>
          <ksd-label>Kjøkken</ksd-label>
          <input ksd-input  type="checkbox" role="switch"/>
        </ksd-field>
        <ksd-field>
          <ksd-label>Bad</ksd-label>
          <input ksd-input  type="checkbox" role="switch"/>
        </ksd-field>
        <ksd-field>
          <ksd-label>Soverom</ksd-label>
          <input ksd-input  type="checkbox" role="switch" />
        </ksd-field>
      </fieldset>`,
  }),
}

export const RightAligned: Story = {
  render: () => ({
    template: `
      <ksd-field>
        <input ksd-input role="switch" type="checkbox" role="switch"/>
        <ksd-label>Min switch</ksd-label>
      </ksd-field>
    `,
  }),
}
