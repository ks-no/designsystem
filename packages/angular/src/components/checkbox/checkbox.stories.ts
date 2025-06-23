import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from 'storybook/test';
import { Field } from '../field/field';
import { Fieldset } from '../fieldset/fieldset';
import { FieldsetDescription } from '../fieldset/fieldset-description';
import { FieldsetLegend } from '../fieldset/fieldset-legend';
import { Label } from '../label/label';
import { Checkbox } from './checkbox';

const meta: Meta<Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [
    moduleMetadata({
      imports: [Checkbox, Fieldset, FieldsetDescription, FieldsetLegend, Label, Field],
    })
  ]
};
export default meta;
type Story = StoryObj<Checkbox>;

export const Primary: Story = {
  args: {},

  render: (_args: any) => ({
    template: `
     <fieldset ksd-fieldset style="width: 400px;">
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> I can be chosen </ksd-label>
        <input ksd-checkbox value="telefon"  />
      </ksd-field>

    </fieldset>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeTruthy()
  },
};
