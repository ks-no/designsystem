import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'
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

type SwitchArgs = CommonArgs & {
  position: 'start' | 'end'
  'data-variant'?: 'outline'
}

const meta: Meta<SwitchArgs> = {
  component: Input,
  title: 'Forms/Switch',
  argTypes: {
    ...commonArgTypes,
    position: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the switch input',
    },
    'data-variant': {
      control: 'radio',
      options: [undefined, 'outline'],
      description: 'Field variant',
    },
  },
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
    position: 'start',
    'data-variant': undefined,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field ${argsToTemplate(args)}>
          <ksd-label>Min switch</ksd-label>
          <input ksd-input role="switch" type="checkbox" role="switch"/>
        </ksd-field>
    `,
  }),
}

export const Outline: Story = {
  args: {
    position: 'start',
    'data-variant': 'outline',
  },

  render: () => ({
    template: `
      <fieldset ksd-fieldset>
        <legend ksd-fieldset-legend>Outline variant</legend>

        <ksd-field data-variant="outline">
          <ksd-label>with description</ksd-label>
          <input ksd-input role="switch" type="checkbox" value="description" />
          <p ksd-field-description>description text</p>
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>Checked</ksd-label>
          <input ksd-input role="switch" type="checkbox" value="checked" checked />
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>disabled</ksd-label>
          <input ksd-input role="switch" type="checkbox" value="disabled" disabled />
        </ksd-field>

        <ksd-field data-variant="outline">
          <ksd-label>readonly checked</ksd-label>
          <input
            ksd-input
            role="switch"
            type="checkbox"
            value="readonly"
            readonly
            checked
          />
        </ksd-field>
      </fieldset>
    `,
  }),
}

export const Grouped: Story = {
  render: (args) => ({
    props: args,
    template: `
      <fieldset ksd-fieldset ${argsToTemplate(args)}>
        <legend ksd-fieldset-legend> Skru av/på lys </legend>
        <ksd-field  ${argsToTemplate(args)}>
          <ksd-label>Stue</ksd-label>
          <input ksd-input  type="checkbox" role="switch" checked=${true} />
        </ksd-field>
        <ksd-field  ${argsToTemplate(args)}>
          <ksd-label>Kjøkken</ksd-label>
          <input ksd-input  type="checkbox" role="switch"/>
        </ksd-field>
        <ksd-field ${argsToTemplate(args)}>
          <ksd-label>Bad</ksd-label>
          <input ksd-input  type="checkbox" role="switch"/>
        </ksd-field>
        <ksd-field ${argsToTemplate(args)}>
          <ksd-label>Soverom</ksd-label>
          <input ksd-input  type="checkbox" role="switch" />
        </ksd-field>
      </fieldset>`,
  }),
}

export const RightAligned: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ksd-field ${argsToTemplate(args)}>
        <input ksd-input role="switch" type="checkbox" role="switch"/>
        <ksd-label>Min switch</ksd-label>
      </ksd-field>
    `,
  }),
}
