import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './radio.examples'

type RadioArgs = {
  'data-size'?: string
  'data-variant'?: 'outline'
  legend: string
  disabled?: boolean
  readonly?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'radio',
  imports: examples.imports,
}

const meta: Meta<RadioArgs> = {
  title: 'Komponenter/Radio',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  render: renderExample,
}
export default meta

type Story = StoryObj<RadioArgs>

const answers = [
  ['digital', 'Digital postkasse'],
  ['brev', 'Brev i posten'],
  ['servicetorget', 'Hente på servicetorget'],
]

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    legend: 'Hvordan vil du få svar på søknaden?',
    disabled: false,
    readonly: false,
  },
  argTypes: {
    'data-variant': { options: ['outline'], control: { type: 'radio' } },
    legend: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (a) =>
    html`<fieldset class="ds-fieldset">
      <legend class="ds-label">${a.legend}</legend>
      <p class="ds-paragraph">Vi sender svaret innen tre uker.</p>
      ${answers.map(
        ([value, label]) =>
          html`<ds-field
            class="ds-field"
            data-size=${ifDefined(a['data-size'])}
            data-variant=${ifDefined(a['data-variant'])}
          >
            <input
              class="ds-input"
              type="radio"
              name="svar-preview"
              value=${value}
              ?disabled=${a.disabled}
              ?readonly=${a.readonly}
            />
            <label class="ds-label">${label}</label>
          </ds-field>`,
      )}
    </fieldset>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedFeilmelding: Story = {
  name: 'Med feilmelding',
  parameters: { snippets: examples.withError },
}
export const PaSammeLinje: Story = {
  name: 'På samme linje',
  parameters: { snippets: examples.inline },
}
export const UtenSynligLabel: Story = {
  name: 'Uten synlig label',
  parameters: { snippets: examples.withoutVisibleLabel },
}
