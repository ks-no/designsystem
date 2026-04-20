import { ChangeDetectionStrategy, Component } from '@angular/core'
import { render, screen } from '@testing-library/angular'
import { TableHeaderCell } from '../src/table-header-cell'

@Component({
  template: `<th ksd-header-cell [sort]="sort">Header 1</th>`,
  imports: [TableHeaderCell],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  sort: 'none' | 'ascending' | 'descending' | undefined = undefined
}

describe('table header cell', () => {
  it('should render table header cell', async () => {
    await render(TestComponent)
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
  })

  it('should render table header cell with sort button', async () => {
    await render(TestComponent, { componentProperties: { sort: 'none' } })
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render table header cell with sort button with aria-sort', async () => {
    await render(TestComponent, { componentProperties: { sort: 'ascending' } })
    expect(screen.getByRole('columnheader')).toHaveAttribute(
      'aria-sort',
      'ascending',
    )
  })
})
