import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './pagination.examples'

type PaginationArgs = {
  current: number
  total: number
  show: number
  'aria-label': string
  /** Makes the page controls links. `%d` is replaced with the page number. */
  href?: string
  'data-size'?: string
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'pagination',
  changes: [
    'Angular-komponenten lager hele markupen selv, samt noen justeringer for å fungere med `RouterLink`',
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
        'Sidetallet brukeren valgte. Vanlige klikk på lenker stoppes, så du kan navigere med routeren. Ctrl/cmd-klikk åpner som vanlig.',
    },
  ],
}

const meta: Meta<PaginationArgs> = {
  title: 'Komponenter/Pagination',
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<PaginationArgs>

// <ds-pagination> fills in page numbers, labels and aria-current on the controls,
// so the controls have no bindings inside them
const buttons = {
  previous: html`<li>
    <button type="button" class="ds-button" data-variant="tertiary">
      Forrige
    </button>
  </li>`,
  page: html`<li>
    <button type="button" class="ds-button" data-variant="tertiary"></button>
  </li>`,
  next: html`<li>
    <button type="button" class="ds-button" data-variant="tertiary">
      Neste
    </button>
  </li>`,
}
const links = {
  previous: html`<li>
    <a class="ds-button" data-variant="tertiary">Forrige</a>
  </li>`,
  page: html`<li><a class="ds-button" data-variant="tertiary"></a></li>`,
  next: html`<li><a class="ds-button" data-variant="tertiary">Neste</a></li>`,
}

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { current: 4, total: 10, show: 7, 'aria-label': 'Bla i sider' },
  argTypes: {
    current: { control: { type: 'number', min: 1 } },
    total: { control: { type: 'number', min: 1 } },
    show: { control: { type: 'number', min: 3, max: 11 } },
    'aria-label': { control: 'text' },
    href: { control: 'text' },
  },
  render: (a) => {
    const control = a.href ? links : buttons
    return html`<ds-pagination
      class="ds-pagination"
      data-current=${a.current}
      data-total=${a.total}
      data-href=${ifDefined(a.href || undefined)}
      aria-label=${a['aria-label']}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      <ol>
        ${control.previous}
        ${Array.from({ length: a.show }, () => control.page)} ${control.next}
      </ol>
    </ds-pagination>`
  },
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedLenker: Story = {
  ...controls,
  name: 'Med lenker',
  args: { ...controls.args, href: '?side=%d' },
  parameters: { snippets: examples.withLinks },
}
