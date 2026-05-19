import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Field, FieldDescription, FieldError } from '../field'
import { Fieldset } from '../fieldset/fieldset'
import { FieldsetDescription } from '../fieldset/fieldset-description'
import { FieldsetLegend } from '../fieldset/fieldset-legend'
import { Input } from '../input'
import { Label } from '../label'

type InputArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
  'data-variant'?: 'outline'
}

const meta: Meta<InputArgs> = {
  component: Input,
  title: 'Forms/Checkbox',
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      control: 'radio',
      options: [undefined, 'outline'],
      description: 'Field variant',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        Input,
        Label,
        Field,
        FieldDescription,
        FieldError,
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
    'data-variant': undefined,
  },

  render: (args) => ({
    props: args,
    template: `
      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> Checkbox label </ksd-label>
        <input ksd-input type="checkbox" value="some-value" ${argsToTemplate(args)}  />
        <p ksd-field-description>Description</p>
      </ksd-field>
    `,
  }),
}

export const Outline: Story = {
  args: {
    'data-variant': 'outline',
  },

  render: () => ({
    template: `
      <fieldset ksd-fieldset>
        <legend ksd-fieldset-legend>Outline variant</legend>

        <ksd-field data-variant="outline">
          <ksd-label>with description</ksd-label>
          <input ksd-input type="checkbox" value="description" />
          <p ksd-field-description>description text</p>
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>Checked</ksd-label>
          <input ksd-input type="checkbox" value="checked" checked />
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>with error state</ksd-label>
          <input ksd-input type="checkbox" value="error" aria-invalid="true" />
          <p ksd-error>the error message</p>
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>disabled not checked</ksd-label>
          <input ksd-input type="checkbox" value="disabled" disabled />
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>disabled</ksd-label>
          <input ksd-input type="checkbox" value="disabled" disabled checked />
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>readonly not checked</ksd-label>
          <input ksd-input type="checkbox" value="readonly2" readonly />
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>readonly checked</ksd-label>
          <input ksd-input type="checkbox" value="readonly" readonly checked />
        </ksd-field>
      </fieldset>
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

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field ${argsToTemplate(args)}>
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

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field ${argsToTemplate(args)}>
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

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> E-post </ksd-label>
        <input ksd-input type="checkbox" value="e-post" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon" ${argsToTemplate(args)}  />
      </ksd-field>

      <ksd-field ${argsToTemplate(args)}>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms" ${argsToTemplate(args)}  />
      </ksd-field>

    </fieldset>
    `,
  }),
}
