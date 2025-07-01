import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { expect } from 'storybook/test'
import { Field } from '../field/field'
import { FieldDescription } from '../field/field-description'
import { Fieldset } from '../fieldset/fieldset'
import { FieldsetDescription } from '../fieldset/fieldset-description'
import { FieldsetLegend } from '../fieldset/fieldset-legend'
import { Input } from '../input/input'
import { Label } from '../label/label'

const meta: Meta<Input> = {
  component: Input,
  title: 'Checkbox',
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
type Story = StoryObj<Input>

export const Preview: Story = {
  args: {},

  render: () => ({
    template: `
      <ksd-field>
        <ksd-label> Checkbox label </ksd-label>
        <input ksd-input type="checkbox" value="some-value"  />
        <p ksd-field-description>Description</p>
      </ksd-field>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Checkbox label/gi)).toBeTruthy()
  },
}

export const Group: Story = {
  args: {},

  render: () => ({
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
        <input ksd-input type="checkbox" value="e-post"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" value="sms"  />
      </ksd-field>

    </fieldset>
    `,
  }),
}

export const AriaLabel: Story = {
  args: {},

  render: () => ({
    template: `
      <ksd-field>
        <input ksd-input type="checkbox" value="some-value" aria-label="Checkbox label"  />
      </ksd-field>
    `,
  }),
}

export const ReadOnly: Story = {
  args: {},

  render: () => ({
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
        <input ksd-input type="checkbox" readonly value="e-post"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" readonly value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" readonly value="sms"  />
      </ksd-field>

    </fieldset>
    `,
  }),
}

export const Disabled: Story = {
  args: {},

  render: () => ({
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
        <input ksd-input type="checkbox" disabled value="e-post"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-input type="checkbox" disabled value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-input type="checkbox" disabled value="sms"  />
      </ksd-field>

    </fieldset>
    `,
  }),
}
