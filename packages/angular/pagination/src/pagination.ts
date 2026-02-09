import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: '[ksd-pagination]',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ds-pagination
      class="ds-pagination"
      [attr.data-current]="dataCurrent()"
      [attr.data-total]="dataTotal()"
    >
      <ng-content />
    </ds-pagination>
  `,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  host: {
    class: 'ds-pagination',
  },
})
export class Pagination {
  /**
   * The current page
   */
  readonly dataCurrent = input.required<number>({
    alias: 'data-current',
  })

  /**
   * The total number of pages
   */
  readonly dataTotal = input.required<number>({
    alias: 'data-total',
  })
}
