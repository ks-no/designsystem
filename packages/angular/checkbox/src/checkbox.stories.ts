import { Field, FieldDescription } from '@ks-digital/designsystem-angular/field'
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from '@ks-digital/designsystem-angular/fieldset'
import { Input } from '@ks-digital/designsystem-angular/input'
import { Label } from '@ks-digital/designsystem-angular/label'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../.storybook/default-args'

type InputArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<Input> = {
  component: Input,
  title: 'Komponenter/Checkbox',
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
      <ksd-field>
        <ksd-label> Checkbox label </ksd-label>
        <input ksd-input type="checkbox" value="some-value" ${argsToTemplate(args)}  />
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
     <fieldset ksd-fieldset>
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms" ${argsToTemplate(args)}  />
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
      <ksd-field>
        <input ksd-input type="checkbox" value="some-value" aria-label="Checkbox label" ${argsToTemplate(args)}  />
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
     <fieldset ksd-fieldset>
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms" ${argsToTemplate(args)}  />
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
     <fieldset ksd-fieldset>
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms" ${argsToTemplate(args)}  />
      </ksd-field>

    </fieldset>
    `,
  }),
}
