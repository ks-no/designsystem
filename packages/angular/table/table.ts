import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core'

@Component({
  selector: 'table[ksd-table]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'ds-table',
    '[attr.data-hover]': 'hover() || undefined',
    '[attr.data-border]': 'border() || undefined',
    '[attr.data-sticky-header]': 'stickyHeader() || undefined',
    '[attr.data-zebra]': 'zebra() || undefined',
  },
})
export class Table {
  /**
   * Will give the table a hover effect on rows
   * @default false
   */
  readonly hover = input(false, { transform: booleanAttribute })
  /**
   * Will give the table a rounded border
   * @default false
   */
  readonly border = input(false, { transform: booleanAttribute })
  /**
   * Will make the table header sticky
   * @default false
   */
  readonly stickyHeader = input(false, { transform: booleanAttribute })
  /**
   * Will give the table zebra striping
   * @default false
   */
  readonly zebra = input(false, { transform: booleanAttribute })
}
