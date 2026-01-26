/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, input, signal } from '@angular/core'

@Directive({
  selector:
    // eslint-disable-next-line @angular-eslint/directive-selector
    'h1[ksd-heading], h2[ksd-heading], h3[ksd-heading], h4[ksd-heading], h5[ksd-heading], h6[ksd-heading]',
  host: {
    class: 'ds-heading',
    '[attr.data-size]': 'dataSize() || null',
    '[attr.id]': 'id() || null',
  },
})
export class Heading {
  public id = signal<string | undefined>(undefined)
  /**
   * Changes text sizing
   * @default 'md'
   */
  readonly dataSize = input<'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>(
    undefined,
    {
      alias: 'data-size',
    },
  )

  /**
   * Set the id of the heading
   * @param id
   */
  setId(id: string) {
    this.id.set(id)
  }
}
