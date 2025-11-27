import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../../.storybook/default-args'
import { Field, FieldDescription } from '../field'
import { Fieldset } from '../fieldset/fieldset'
import { FieldsetDescription } from '../fieldset/fieldset-description'
import { FieldsetLegend } from '../fieldset/fieldset-legend'
import { Input } from '../input'
import { Label } from '../label'

type RadioArgs = CommonArgs & {
  readonly: boolean
  disabled: boolean
}

const meta: Meta<Input> = {
  component: Input,
  title: 'Komponenter/Radio',
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
type Story = StoryObj<RadioArgs>

export const Preview: Story = {
  args: {
    readonly: false,
    disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
        <ksd-field>
          <ksd-label>Label</ksd-label>
          <input type="radio" ksd-input ${argsToTemplate(args)}  />
          <p ksd-field-description>Description</p>
        </ksd-field>
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
        <input ksd-input type="radio" ${argsToTemplate(args)} aria-label="Radio" />
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
        <legend ksd-fieldset-legend>Hvilken iskremsmak er best ? </legend>
          <p ksd-fieldset-description>Velg din favorittsmak blant alternativene.</p>
          <ksd-field>
            <ksd-label>Vanilje</ksd-label>
            <input type="radio" name="icecream" ksd-input ${argsToTemplate(args)}  />
          </ksd-field>
          <ksd-field>
            <ksd-label>Jordbær</ksd-label>
            <input type="radio" name="icecream" ksd-input ${argsToTemplate(args)}  />
          </ksd-field>
          <ksd-field>
            <ksd-label>Sjokolade</ksd-label>
            <input type="radio" name="icecream" ksd-input ${argsToTemplate(args)}  />
          </ksd-field>
          <ksd-field>
            <ksd-label>Jeg spiser ikke iskrem</ksd-label>
            <input type="radio" name="icecream" ksd-input ${argsToTemplate(args)}  />
          </ksd-field>
        </fieldset>
    `,
  }),
}

export const WithError: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
        <fieldset ksd-fieldset>
        <legend ksd-fieldset-legend>Hvilken bydel bor du i?</legend>
        <p ksd-fieldset-description>Bergen er delt inn i åtte bydeler</p>
        <ksd-field>
          <ksd-label>Arna</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Bergenhus</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Fana</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Fyllingsdalen</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Laksevåg</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Ytrebygda</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Årstad</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Åsane</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <p ksd-validation-message>Du må velge en bydel før du kan fortsette.</p>
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
        <legend ksd-fieldset-legend>Hvilken bydel bor du i?</legend>
        <p ksd-fieldset-description>Bergen er delt inn i åtte bydeler</p>
        <ksd-field>
          <ksd-label>Arna</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Bergenhus</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Fana</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Fyllingsdalen</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Laksevåg</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Ytrebygda</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Årstad</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
        <ksd-field>
          <ksd-label>Åsane</ksd-label>
          <input type="radio" name="city" ksd-input ${argsToTemplate(args)}  />
        </ksd-field>
    `,
  }),
}

export const Inline: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
        <fieldset ksd-fieldset>
        <legend ksd-fieldset-legend>Kontaktes på e-post?</legend>
        <p ksd-fieldset-description>Bekreft om du ønsker å bli kontaktet per e-post.</p>
          <div style="display: flex; flex-wrap: wrap; gap: var(--ds-size-6)">
          <ksd-field>
            <ksd-label>Ja</ksd-label>
            <input type="radio" name="my-inline" ksd-input ${argsToTemplate(args)}  />
          </ksd-field>
          <ksd-field>
            <ksd-label>Nei</ksd-label>
            <input type="radio" name="my-inline" ksd-input ${argsToTemplate(args)}  />
          </ksd-field>
        </div>
        </fieldset>
    `,
  }),
}
