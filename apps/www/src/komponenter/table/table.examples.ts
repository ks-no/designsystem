import {
  component,
  el,
  expr,
  per,
  raw,
  snippets,
  type AttrValue,
  type Node,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type TableArgs = {
  'data-zebra'?: boolean
  'data-border'?: boolean
  'data-hover'?: boolean
  'data-size'?: 'sm' | 'md' | 'lg'
}

export const imports: Imports = {
  angular: `import { Table, TableHeaderCell } from '@ks-digital/designsystem-angular/table'`,
  react: `import { Table } from '@ks-digital/designsystem-react'`,
}

const Table = component({
  html: 'table.ds-table',
  angular: 'table[ksd-table]',
  react: 'Table',
  reactProps: {
    'data-zebra': 'zebra',
    'data-border': 'border',
    'data-hover': 'hover',
    'data-sticky-header': 'stickyHeader',
  },
})
const Head = component({ html: 'thead', react: 'Table.Head' })
const Body = component({ html: 'tbody', react: 'Table.Body' })
const Row = component({ html: 'tr', react: 'Table.Row' })
const HeaderCell = component({ html: 'th', react: 'Table.HeaderCell' })
const Cell = component({ html: 'td', react: 'Table.Cell' })
// A header cell with a sort button. Angular and React add the button themselves.
const SortCell = component({
  html: 'th',
  angular: 'th[ksd-header-cell]',
  react: 'Table.HeaderCell',
  reactProps: { 'aria-sort': 'sort' },
})

const columns = ['Saksnummer', 'Søknad', 'Mottatt', 'Status']
const cases = [
  ['2024/1187', 'Byggesøknad', '04.03.2024', 'Under behandling'],
  ['2024/1203', 'Barnehageplass', '05.03.2024', 'Godkjent'],
  ['2024/1240', 'Skjenkebevilling', '11.03.2024', 'Venter på vedlegg'],
  ['2024/1262', 'Parkeringstillatelse', '14.03.2024', 'Godkjent'],
]

const body = (rows: string[][]) =>
  Body(
    {},
    ...rows.map((row) => Row({}, ...row.map((value) => Cell({}, value)))),
  )

/** Flags only when on, so the table doesn't get data-zebra="false" */
const flags = (args: TableArgs) => ({
  'data-zebra': args['data-zebra'] || undefined,
  'data-border': args['data-border'] || undefined,
  'data-hover': args['data-hover'] || undefined,
  'data-size': args['data-size'],
})

export const preview = (args: TableArgs) =>
  snippets(
    Table(
      flags(args),
      el('caption', {}, 'Søknader mottatt i mars'),
      Head({}, Row({}, ...columns.map((c) => HeaderCell({}, c)))),
      body(cases),
    ),
  )

type Sort = 'ascending' | 'descending' | 'none'

const sortCell = (key: string, label: string, sort: Sort) =>
  SortCell(
    {
      'aria-sort': sort,
      '(sortChange)': per({ angular: `sortBy('${key}')` }),
      onClick: per({ react: expr(`() => sortBy('${key}')`) }),
    },
    per<Node | string>({
      html: el('button', { type: 'button' }, label),
      angular: label,
      react: label,
    }),
  )

export const sortable = (args: TableArgs) =>
  snippets(
    per({
      html: raw(
        '<!-- Oppdater aria-sort og rekkefølgen på radene når brukeren klikker -->',
      ),
    }),
    Table(
      flags(args),
      Head(
        {},
        Row(
          {},
          sortCell('saksnummer', 'Saksnummer', 'none'),
          HeaderCell({}, 'Søknad'),
          sortCell('mottatt', 'Mottatt', 'descending'),
          HeaderCell({}, 'Status'),
        ),
      ),
      body([...cases].reverse()),
    ),
  )

const manyCases = Array.from({ length: 8 }, (_, i) => {
  const [, type, , status] = cases[i % cases.length]
  const day = String(i + 1).padStart(2, '0')
  return [`2024/${1100 + i * 7}`, type, `${day}.04.2024`, status]
})

export const stickyHeader = (args: TableArgs) =>
  snippets(
    // The table scrolls inside a container with a set height
    el(
      'div',
      {
        style: per<AttrValue>({
          html: 'max-height: 15rem; overflow: auto',
          angular: 'max-height: 15rem; overflow: auto',
          react: expr(`{ maxHeight: '15rem', overflow: 'auto' }`),
        }),
      },
      Table(
        { ...flags(args), 'data-sticky-header': true },
        Head({}, Row({}, ...columns.map((c) => HeaderCell({}, c)))),
        body(manyCases),
      ),
    ),
  )
