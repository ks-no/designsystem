import { Input } from '@ks-digital/designsystem-angular/forms'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { Table, TableHeaderCell } from './index'

type TableArgs = {
  zebra: boolean
  stickyHeader: boolean
  border: boolean
  hover: boolean
}

type DataRow = {
  id: number
  navn: string
  epost: string
  telefon: string
}

const dummyData: DataRow[] = [
  {
    id: 1,
    navn: 'Lise Nordmann',
    epost: 'lise@nordmann.no',
    telefon: '22345678',
  },
  {
    id: 2,
    navn: 'Kari Nordmann',
    epost: 'kari@nordmann.no',
    telefon: '87654321',
  },
  {
    id: 3,
    navn: 'Ola Nordmann',
    epost: 'ola@nordmann.no',
    telefon: '32345678',
  },
  {
    id: 4,
    navn: 'Per Nordmann',
    epost: 'per@nordmann.no',
    telefon: '12345678',
  },
]

const meta: Meta<TableArgs> = {
  component: Table,
  title: 'Table',
  parameters: {
    layout: 'padded',
  },
  decorators: [
    moduleMetadata({
      imports: [Table, TableHeaderCell, Input],
    }),
  ],
}

export default meta
type Story = StoryObj<TableArgs>

export const Preview: Story = {
  args: {
    zebra: false,
    stickyHeader: false,
    border: false,
    hover: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <table ksd-table ${argsToTemplate(args)}>
        <caption>Table caption</caption>
        <thead>
          <tr>
            <th ksd-header-cell>Header 1</th>
            <th ksd-header-cell>Header 2</th>
            <th ksd-header-cell>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
          </tr>
          <tr>
            <td>Cell 4</td>
            <td>Cell 5</td>
            <td>Cell 6</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Footer 1</th>
            <th>Footer 2</th>
            <th>Footer 3</th>
          </tr>
        </tfoot>
      </table>
    `,
  }),
}

export const Numbers: Story = {
  args: {
    zebra: true,
    border: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <table
        ksd-table
        style="table-layout:fixed;font-variant-numeric:tabular-nums"
        ${argsToTemplate(args)}
      >
        <caption>Antall søknader per måned</caption>
        <thead>
          <tr>
            <th scope="col">Måned</th>
            <th scope="col" style="text-align:right">2023</th>
            <th scope="col" style="text-align:right">2024</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Januar</th>
            <td style="text-align:right">1 230</td>
            <td style="text-align:right">1 450</td>
          </tr>
          <tr>
            <th scope="row">Februar</th>
            <td style="text-align:right">980</td>
            <td style="text-align:right">1 120</td>
          </tr>
          <tr>
            <th scope="row">Mars</th>
            <td style="text-align:right">1 150</td>
            <td style="text-align:right">1 300</td>
          </tr>
        </tbody>
      </table>
    `,
  }),
}

export const Sortable: Story = {
  render: (args) => {
    const state: {
      sortField: keyof DataRow | undefined
      sortDirection: 'none' | 'ascending' | 'descending' | undefined
    } = {
      sortField: undefined,
      sortDirection: undefined,
    }

    return {
      props: {
        ...args,
        state,
        sortFor: (field: keyof DataRow) =>
          state.sortField === field ? state.sortDirection : 'none',
        toggleSort: (field: keyof DataRow) => {
          if (
            state.sortField === field &&
            state.sortDirection === 'descending'
          ) {
            state.sortField = undefined
            state.sortDirection = undefined
            return
          }

          state.sortDirection =
            state.sortField === field && state.sortDirection === 'ascending'
              ? 'descending'
              : 'ascending'
          state.sortField = field
        },
        sortedData: () => {
          const sortedRows = [...dummyData]

          if (state.sortField === undefined || !state.sortDirection) {
            return sortedRows
          }

          const sortField = state.sortField
          const sortDirection = state.sortDirection

          return sortedRows.sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            if (aValue < bValue) {
              return sortDirection === 'ascending' ? -1 : 1
            }

            if (aValue > bValue) {
              return sortDirection === 'ascending' ? 1 : -1
            }

            return 0
          })
        },
      },
      template: `
        <table ksd-table ${argsToTemplate(args)}>
          <thead>
            <tr>
              <th
                ksd-header-cell
                [sort]="sortFor('navn')"
                (sortChange)="toggleSort('navn')"
              >
                Navn
              </th>
              <th>Epost</th>
              <th
                ksd-header-cell
                [sort]="sortFor('telefon')"
                (sortChange)="toggleSort('telefon')"
              >
                Telefon
              </th>
            </tr>
          </thead>
          <tbody>
            @for (row of sortedData(); track row.id) {
              <tr>
                <td>{{ row.navn }}</td>
                <td>{{ row.epost }}</td>
                <td>{{ row.telefon }}</td>
              </tr>
            }
          </tbody>
        </table>
      `,
    }
  },
}

export const StickyHeader: Story = {
  args: {
    stickyHeader: true,
  },
  render: (args) => ({
    props: {
      ...args,
      rows: Array.from({ length: 50 }, (_, i) => i + 1),
    },
    template: `
      <div style="height:280px;overflow:auto;padding:0">
        <table ksd-table tabindex="0" ${argsToTemplate(args)}>
          <thead>
            <tr>
              <th ksd-header-cell>Header 1</th>
              <th ksd-header-cell>Header 2</th>
              <th ksd-header-cell>Header 3</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows; track row) {
              <tr>
                <td>{{ 'Cell ' + row + '1' }}</td>
                <td>{{ 'Cell ' + row + '2' }}</td>
                <td>{{ 'Cell ' + row + '3' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    `,
  }),
}

export const WithFormElements: Story = {
  render: (args) => ({
    props: {
      ...args,
      rows: ['Kari Nordmann', 'Ola Nordmann', 'Jens Nordmann'],
    },
    template: `
      <table ksd-table ${argsToTemplate(args)}>
        <thead>
          <tr>
            <th>
              <input ksd-input type="checkbox" aria-label="Velg alle ansatte" />
            </th>
            <th>Navn</th>
            <th>Stilling</th>
            <th>Kommentar</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track row) {
            <tr>
              <td>
                <input ksd-input type="checkbox" [attr.aria-label]="'Velg ' + row" />
              </td>
              <td>{{ row }}</td>
              <td>Rådgiver</td>
              <td>
                <input
                  ksd-input
                  type="text"
                  data-size="sm"
                  [attr.aria-label]="'Textfield ' + row"
                />
              </td>
            </tr>
          }
        </tbody>
      </table>
    `,
  }),
}

export const FixedTable: Story = {
  render: (args) => ({
    props: {
      ...args,
      rows: Array.from({ length: 3 }, (_, i) => i + 1),
    },
    template: `
      <table ksd-table style="table-layout:fixed" ${argsToTemplate(args)}>
        <thead>
          <tr>
            <th ksd-header-cell>Header 1</th>
            <th ksd-header-cell>Header 2</th>
            <th ksd-header-cell>Header 3</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track row) {
            <tr>
              <td>{{ 'Cell ' + row + '1' }}</td>
              <td>{{ 'Cell ' + row + '2' }}</td>
              <td>{{ 'Cell ' + row + '3' }}</td>
            </tr>
          }
        </tbody>
      </table>
    `,
  }),
}

export const MultipleHeaderRows: Story = {
  render: (args) => ({
    props: {
      ...args,
      rows: Array.from({ length: 50 }, (_, i) => i + 1),
    },
    template: `
      <table ksd-table ${argsToTemplate(args)}>
        <thead>
          <tr>
            <th ksd-header-cell>Header 1</th>
            <th ksd-header-cell colspan="2">Header 2</th>
          </tr>
          <tr>
            <th ksd-header-cell>Header 3</th>
            <th ksd-header-cell>Header 4</th>
            <th ksd-header-cell>Header 5</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track row) {
            <tr>
              <td>{{ 'Cell ' + row + '1' }}</td>
              <td>{{ 'Cell ' + row + '2' }}</td>
              <td>{{ 'Cell ' + row + '3' }}</td>
            </tr>
          }
        </tbody>
      </table>
    `,
  }),
}

export const WithBorder: Story = {
  args: {
    border: true,
  },
  render: (args) => ({
    props: {
      ...args,
      rows: Array.from({ length: 3 }, (_, i) => i + 1),
    },
    template: `
      <div style="display:grid;gap:1rem">
        <table ksd-table ${argsToTemplate(args)}>
          <tbody>
            @for (row of rows; track row) {
              <tr>
                <td>{{ 'Cell ' + row + '1' }}</td>
                <td>{{ 'Cell ' + row + '2' }}</td>
                <td>{{ 'Cell ' + row + '3' }}</td>
              </tr>
            }
          </tbody>
          <tbody>
            @for (row of rows; track row + '-secondary' ) {
              <tr>
                <td>{{ 'Cell ' + row + '1' }}</td>
                <td>{{ 'Cell ' + row + '2' }}</td>
                <td>{{ 'Cell ' + row + '3' }}</td>
              </tr>
            }
          </tbody>
        </table>

        <table ksd-table ${argsToTemplate(args)}>
          <thead>
            <tr>
              <th ksd-header-cell>Header 3</th>
              <th ksd-header-cell>Header 4</th>
              <th ksd-header-cell>Header 5</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows; track row) {
              <tr>
                <td>{{ 'Cell ' + row + '1' }}</td>
                <td>{{ 'Cell ' + row + '2' }}</td>
                <td>{{ 'Cell ' + row + '3' }}</td>
              </tr>
            }
          </tbody>
        </table>

        <table ksd-table ${argsToTemplate(args)}>
          <tbody>
            @for (row of rows; track row) {
              <tr>
                <td>{{ 'Cell ' + row + '1' }}</td>
                <td>{{ 'Cell ' + row + '2' }}</td>
                <td>{{ 'Cell ' + row + '3' }}</td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th>Footer 1</th>
              <th>Footer 2</th>
              <th>Footer 3</th>
            </tr>
          </tfoot>
        </table>
      </div>
    `,
  }),
}
