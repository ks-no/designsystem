import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core'
@Component({
  selector: 'th[ksd-header-cell]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (sort()) {
      <button
        type="button"
        (click)="sortChange.emit(); $event.stopPropagation()"
      >
        <ng-container *ngTemplateOutlet="headerTitle"></ng-container>
      </button>
    } @else {
      <ng-container *ngTemplateOutlet="headerTitle"></ng-container>
    }

    <ng-template #headerTitle>
      <ng-content />
    </ng-template>
  `,
  imports: [NgTemplateOutlet],
  host: {
    '[attr.aria-sort]': 'sort()',
  },
  styles: `
    button {
      padding: var(--dsc-table-padding);
    }
  `,
})
export class TableHeaderCell {
  /**
   * If 'none' | 'ascending' | 'descending' will add a button to the header cell and change aria-sort and icon
   * @default undefined
   */
  readonly sort = input<'none' | 'ascending' | 'descending'>(undefined, {
    alias: 'aria-sort',
  })
  /**
   * Emitted when the sort button is clicked
   * @emits void
   */
  readonly sortChange = output()
}
