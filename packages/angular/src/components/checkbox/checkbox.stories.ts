import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from 'storybook/test';
import { Field } from '../field/field';
import { Fieldset } from '../fieldset/fieldset';
import { FieldsetDescription } from '../fieldset/fieldset-description';
import { FieldsetLegend } from '../fieldset/fieldset-legend';
import { Label } from '../label/label';
import { Checkbox } from './checkbox';
import { CheckboxDescription } from './checkbox-description';

const meta: Meta<Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [
    moduleMetadata({
      imports: [Checkbox, Label, Field, CheckboxDescription, Fieldset, FieldsetDescription, FieldsetLegend],
    })
  ]
};
export default meta;
type Story = StoryObj<Checkbox>;

export const Preview: Story = {
  args: {},

  render: (_args: any) => ({
    template: `
      <ksd-field>
        <ksd-label> Checkbox label </ksd-label>
        <input ksd-checkbox value="some-value"  />
        <p ksd-checkbox-description>Description</p>
      </ksd-field>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Checkbox label/gi)).toBeTruthy()
  },
};


export const Group: Story = {
  args: {},

  render: (_args: any) => ({
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
        <input ksd-checkbox value="e-post"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input ksd-checkbox value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input ksd-checkbox value="sms"  />
      </ksd-field>

    </fieldset>
    `,
  }),
};


export const AriaLabel: Story = {
  args: {},

  render: (_args: any) => ({
    template: `
      <ksd-field>
        <input ksd-checkbox value="some-value" aria-label="Checkbox label"  />
      </ksd-field>
    `,
  }),
};

export const ReadOnly: Story = {
  args: {},

  render: (_args: any) => ({
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
        <input readonly ksd-checkbox value="e-post"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input readonly ksd-checkbox value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input readonly ksd-checkbox value="sms"  />
      </ksd-field>

    </fieldset>
    `,
  }),
};

export const Disabled: Story = {
  args: {},

  render: (_args: any) => ({
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
        <input disabled ksd-checkbox value="e-post"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> Telefon </ksd-label>
        <input disabled ksd-checkbox value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> SMS </ksd-label>
        <input disabled ksd-checkbox value="sms"  />
      </ksd-field>

    </fieldset>
    `,
  }),
};
