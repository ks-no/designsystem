import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'

/**
 * Skeleton is used to represent a draft of a page while the content loads.
 */
@Component({
  selector: 'ksd-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content />`,
  host: {
    class: 'ds-skeleton',
    '[attr.data-variant]': 'variant()',
    '[attr.data-text]': 'dataText()',
    'aria-hidden': 'true',
  },
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Skeleton {
  /**
   * Specify which variant to use
   * @default 'rectangle'
   */
  readonly variant = input<'rectangle' | 'circle' | 'text'>('rectangle', {
    alias: 'data-variant',
  })

  readonly isText = computed(() => this.variant() === 'text')

  readonly dataText = computed(() => {
    return this.isText() ? '-' : null
  })
}
