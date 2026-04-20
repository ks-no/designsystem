import { ChangeDetectionStrategy, Component } from '@angular/core'
import { fireEvent, render, screen } from '@testing-library/angular'
import { vi } from 'vitest'
import { TableHeaderCell } from '../src/table-header-cell'

@Component({
  template: `<th
    ksd-header-cell
    [aria-sort]="sort"
    (sortChange)="onSortChange()"
  >
    Header 1
  </th>`,
  imports: [TableHeaderCell],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  sort: 'none' | 'ascending' | 'descending' | undefined = undefined
  readonly onSortChange = vi.fn()
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

  it('should emit sortChange when sort button is clicked', async () => {
    const { fixture } = await render(TestComponent, {
      componentProperties: { sort: 'none' },
    })

    fireEvent.click(screen.getByRole('button'))

    expect(fixture.componentInstance.onSortChange).toHaveBeenCalledTimes(1)
  })
})
