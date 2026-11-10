import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { SuggestionArgs } from './suggestion.examples'
import * as examples from './suggestion.examples'

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
  args: { label: 'Velg kommune', multiple: false, creatable: false },
  argTypes: {
    ...commonArgTypes,
    label: { control: 'text' },
    multiple: { control: 'boolean' },
    creatable: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    // Full width is too wide for a single field
    (story) => `<div style="max-inline-size: 30rem">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<SuggestionArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const ISkjema: Story = {
  name: 'I skjema',
  parameters: { snippets: examples.inForm },
}
