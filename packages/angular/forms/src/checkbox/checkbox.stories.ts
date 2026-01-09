import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Field, FieldDescription } from '../field'
import { Fieldset } from '../fieldset/fieldset'
import { FieldsetDescription } from '../fieldset/fieldset-description'
import { FieldsetLegend } from '../fieldset/fieldset-legend'
import { Input } from '../input'
import { Label } from '../label'

type InputArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<InputArgs> = {
  component: Input,
  title: 'Komponenter/Forms/Checkbox',
  argTypes: {
    ...commonArgTypes,
  },
  decorators: [
    moduleMetadata({
      imports: [
        Input,
        Label,
        Field,
        FieldDescription,
        Fieldset,
        FieldsetDescription,
        FieldsetLegend,
      ],
    }),
  ],
}
export default meta
type Story = StoryObj<InputArgs>

export const Preview: Story = {
  args: {
    readonly: false,
    disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> Checkbox label </ksd-label>
        <input ksd-input type="checkbox" value="some-value"  />
        <p ksd-field-description>Description</p>
      </ksd-field>
    `,
  }),
}

export const Group: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
     <fieldset ksd-fieldset ${argsToTemplate(args)}>
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post"   />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon"   />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms"   />
      </ksd-field>

    </fieldset>
    `,
  }),
}

export const AriaLabel: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
      <ksd-field ${argsToTemplate(args)}>
        <input ksd-input type="checkbox" value="some-value" aria-label="Checkbox label"  />
      </ksd-field>
    `,
  }),
}

export const ReadOnly: Story = {
  args: {
    ...Preview.args,
    readonly: true,
  },

  render: (args) => ({
    props: args,
    template: `
     <fieldset ksd-fieldset ${argsToTemplate(args)}>
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post"   />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon"   />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms"   />
      </ksd-field>

    </fieldset>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    ...Preview.args,
    disabled: true,
  },

  render: (args) => ({
    props: args,
    template: `
     <fieldset ksd-fieldset ${argsToTemplate(args)}> 
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post"   />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon"   />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms"   />
      </ksd-field>

    </fieldset>
    `,
  }),
}
