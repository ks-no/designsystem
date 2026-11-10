import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { PaginationArgs } from './pagination.examples'
import * as examples from './pagination.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'pagination',
  changes: [
    'Angular-komponenten lager hele markupen selv. Du sender inn current og total, og får valgt side tilbake i pageClicked.',
    'Angular-komponenten kan lage lenker i stedet for knapper med href, slik at hver side får sin egen URL.',
  ],
  source: 'packages/angular/pagination/src',
  imports: examples.imports,
  // From packages/angular/pagination/src/pagination.ts
  angularApi: [
    {
      name: 'current',
      kind: 'input',
      type: 'number',
      description: 'Siden som vises nå. Påkrevd.',
    },
    {
      name: 'total',
      kind: 'input',
      type: 'number',
      description: 'Totalt antall sider. Påkrevd.',
    },
    {
      name: 'show',
      kind: 'input',
      type: 'number',
      default: '7',
      description: 'Hvor mange sideknapper som vises, inkludert ellipser.',
    },
    {
      name: 'href',
      kind: 'input',
      type: 'string',
      description:
        'Gjør knappene til lenker. %d byttes med sidetallet, f.eks. "?side=%d".',
    },
    {
      name: 'aria-label',
      kind: 'input',
      type: 'string',
      default: "'Bla i sider'",
      description: 'Navn på navigasjonen for skjermlesere.',
    },
    {
      name: 'previousLabel',
      kind: 'input',
      type: 'string',
      default: "'Forrige'",
      description: 'Tekst på forrige-knappen.',
    },
    {
      name: 'nextLabel',
      kind: 'input',
      type: 'string',
      default: "'Neste'",
      description: 'Tekst på neste-knappen.',
    },
    {
      name: 'pageLabel',
      kind: 'input',
      type: 'string',
      default: "'Side %d'",
      description: 'Skjermlesertekst for hver side.',
    },
    {
      name: 'pageClicked',
      kind: 'output',
      type: 'number',
      description:
        'Sidetallet brukeren valgte. Vanlige klikk på lenker stoppes, så du kan navigere med routeren; ctrl/cmd-klikk åpner som vanlig.',
    },
  ],
}

const meta: Meta<PaginationArgs> = {
  title: 'Komponenter/Pagination',
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { current: 4, total: 10, show: 7, 'aria-label': 'Bla i sider' },
  argTypes: {
    ...commonArgTypes,
    current: { control: { type: 'number', min: 1 } },
    total: { control: { type: 'number', min: 1 } },
    show: { control: { type: 'number', min: 3, max: 11 } },
    'aria-label': { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<PaginationArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const MedLenker: Story = {
  name: 'Med lenker',
  parameters: { snippets: examples.withLinks },
}
