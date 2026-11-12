import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './suggestion.examples'

type SuggestionArgs = {
  'data-size'?: string
  'data-color'?: string
  label: string
  multiple: boolean
  creatable: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'suggestion',
  changes: [
    'Angular-komponenten lager markupen for ds-suggestion selv. Du skriver forslagene som ksd-suggestion-list-option.',
    'Angular-komponenten kan bindes til signal forms med formField. Verdien er alltid primitiv: string, eller string[] med multiple.',
  ],
  source: 'packages/angular/suggestion/src',
  imports: examples.imports,
  // From packages/angular/suggestion/src/suggestion.ts and suggestion-list.ts
  angularApi: [
    {
      name: 'multiple',
      kind: 'input',
      type: 'boolean',
      default: 'false',
      description: 'Lar brukeren velge flere.',
    },
    {
      name: 'creatable',
      kind: 'input',
      type: 'boolean',
      default: 'false',
      description: 'Lar brukeren legge til verdier som ikke står i listen.',
    },
    {
      name: 'filter',
      kind: 'input',
      type: 'boolean | SuggestionFilter',
      default: 'true',
      description:
        'Filtrerer forslagene mens brukeren skriver. Send inn en egen funksjon, eller false hvis du filtrerer selv.',
    },
    {
      name: 'value',
      kind: 'model',
      type: 'string | string[] | undefined',
      description:
        'Valgt verdi som rene verdier: string, eller string[] med multiple. Det er denne formField binder til.',
    },
    {
      name: 'selected',
      kind: 'input',
      type: 'SuggestionItem | SuggestionItem[] | string | string[] | null | undefined',
      description:
        'Styrer valget utenfra. Godtar både { label, value } og rene verdier. Ikke bruk sammen med formField.',
    },
    {
      name: 'selectedChange',
      kind: 'output',
      type: 'SuggestionItem | SuggestionItem[] | undefined',
      description:
        'Valget når brukeren endrer det, alltid som { label, value }, eller en liste med multiple.',
    },
    {
      name: 'touched',
      kind: 'input',
      type: 'boolean',
      default: 'false',
      description: 'Om feltet er besøkt. Settes av signal forms.',
    },
    {
      name: 'dirty',
      kind: 'input',
      type: 'boolean',
      default: 'false',
      description: 'Om verdien er endret. Settes av signal forms.',
    },
    {
      name: 'touch',
      kind: 'output',
      type: 'void',
      description:
        'Sendes når fokus forlater feltet, slik at signal forms markerer det som besøkt.',
    },
    {
      name: 'singular',
      kind: 'input',
      type: 'string',
      default: "'%d forslag'",
      description:
        'På ksd-suggestion-list: skjermlesertekst for antall treff, når det er ett.',
    },
    {
      name: 'plural',
      kind: 'input',
      type: 'string',
      default: "'%d forslag'",
      description:
        'På ksd-suggestion-list: skjermlesertekst for antall treff, når det er flere.',
    },
  ],
}

const meta: Meta<SuggestionArgs> = {
  title: 'Komponenter/Suggestion',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
  render: renderExample,
  decorators: [
    // Full width is too wide for a single field
    (story) => html`<div style="max-inline-size: 30rem">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<SuggestionArgs>

// The value is the municipality number, the label is what the user sees and searches
const kommuner = [
  { label: 'Bergen', value: '4601' },
  { label: 'Kristiansand', value: '4204' },
  { label: 'Oslo', value: '0301' },
  { label: 'Stavanger', value: '1103' },
  { label: 'Trondheim', value: '5001' },
]

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Velg kommune', multiple: false, creatable: false },
  argTypes: {
    label: { control: 'text' },
    multiple: { control: 'boolean' },
    creatable: { control: 'boolean' },
  },
  // u-datalist reads data-multiple/data-creatable. The empty option is left empty with
  // creatable, so ds-suggestion can show «Legg til "…"» in it.
  render: (a) =>
    html`<ds-field class="ds-field">
      <label class="ds-label">${a.label}</label>
      <ds-suggestion
        class="ds-suggestion"
        ?data-multiple=${a.multiple}
        ?data-creatable=${a.creatable}
        data-size=${ifDefined(a['data-size'])}
        data-color=${ifDefined(a['data-color'])}
      >
        <input class="ds-input" />
        <button type="reset"></button>
        <u-datalist>
          ${kommuner.map(
            ({ label, value }) =>
              html`<u-option value=${value}>${label}</u-option>`,
          )}
          <u-option data-empty>${a.creatable ? '' : 'Ingen treff'}</u-option>
        </u-datalist>
      </ds-suggestion>
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const ISkjema: Story = {
  name: 'I skjema',
  parameters: { snippets: examples.inForm },
}
