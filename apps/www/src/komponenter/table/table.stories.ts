import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './table.examples'

type TableArgs = {
  'data-zebra'?: boolean
  'data-border'?: boolean
  'data-hover'?: boolean
  'data-size'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'table',
  changes: [
    'Vi har lagt til støtte for ekspanderbare rader. Inspirert av Mattilsynet og Udir.',
  ],
  source: 'packages/web/src/table',
  imports: examples.imports,
}

const meta: Meta<TableArgs> = {
  title: 'Komponenter/Table',
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

type Story = StoryObj<TableArgs>

const columns = ['Saksnummer', 'Søknad', 'Mottatt', 'Status']
const cases = [
  ['2024/1187', 'Byggesøknad', '04.03.2024', 'Under behandling'],
  ['2024/1203', 'Barnehageplass', '05.03.2024', 'Godkjent'],
  ['2024/1240', 'Skjenkebevilling', '11.03.2024', 'Venter på vedlegg'],
  ['2024/1262', 'Parkeringstillatelse', '14.03.2024', 'Godkjent'],
]

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { 'data-zebra': false, 'data-border': false, 'data-hover': false },
  argTypes: {
    'data-zebra': { control: 'boolean' },
    'data-border': { control: 'boolean' },
    'data-hover': { control: 'boolean' },
  },
  render: (a) =>
    html`<table
      class="ds-table"
      ?data-zebra=${a['data-zebra']}
      ?data-border=${a['data-border']}
      ?data-hover=${a['data-hover']}
      data-size=${ifDefined(a['data-size'])}
    >
      <caption>
        Søknader mottatt i mars
      </caption>
      <thead>
        <tr>
          ${columns.map((column) => html`<th>${column}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${cases.map(
          (row) =>
            html`<tr>
              ${row.map((value) => html`<td>${value}</td>`)}
            </tr>`,
        )}
      </tbody>
    </table>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

const sortRows = (event: Event) => {
  const button = (event.target as Element).closest('th[aria-sort] > button')
  const th = button?.parentElement as HTMLTableCellElement | undefined
  const table = th?.closest('table')
  if (!th || !table) return

  const direction =
    th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending'
  for (const other of table.querySelectorAll('th[aria-sort]')) {
    other.setAttribute('aria-sort', 'none')
  }
  th.setAttribute('aria-sort', direction)

  // dd.mm.yyyy -> yyyymmdd, so dates sort as text. Other cells have no dots.
  const key = (row: HTMLTableRowElement) =>
    (row.cells[th.cellIndex]?.textContent ?? '')
      .trim()
      .split('.')
      .reverse()
      .join('')
  const rows = [...table.tBodies[0].rows].sort((a, b) =>
    key(a).localeCompare(key(b), 'nb', { numeric: true }),
  )
  if (direction === 'descending') rows.reverse()
  table.tBodies[0].append(...rows)
}

export const Sorterbar: Story = {
  parameters: { snippets: examples.sortable },
  render: (args, context) =>
    html`<div style="display: contents" @click=${sortRows}>
      ${renderExample(args, context)}
    </div>`,
}
export const FastOverskriftsrad: Story = {
  name: 'Fast overskriftsrad',
  parameters: { snippets: examples.stickyHeader },
}
export const EkspanderbareRader: Story = {
  name: 'Ekspanderbare rader',
  parameters: { snippets: examples.expandable },
}
