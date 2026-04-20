import { ChangeDetectionStrategy, Component } from '@angular/core'
import { render, screen } from '@testing-library/angular'
import { Table } from './table'
import { TableHeaderCell } from './table-header-cell'

@Component({
  template: `
    <table ksd-table>
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
          <td>Footer 1</td>
          <td>Footer 2</td>
          <td>Footer 3</td>
        </tr>
      </tfoot>
    </table>
  `,
  imports: [TableHeaderCell, Table],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

describe('table', () => {
  it('should render table', async () => {
    await render(TestComponent)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('should render with children', async () => {
    await render(TestComponent)
    expect(screen.getByRole('table').querySelector('tr')).toBeInTheDocument()
  })
})
