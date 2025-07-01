/* eslint-disable @angular-eslint/no-input-rename */

/**
 * We use input aliasing to bridge the gap between Angular's camelCase property naming convention and our HTML data attributes.
 * This approach allows us to use valid HTML data attributes as documented by Designsystemet while maintaining
 * proper TypeScript intellisense support.
 */

import { Directive, input } from '@angular/core'
import { Color } from './colors'

export type Size = 'sm' | 'md' | 'lg' | 'xl'

@Directive()
export class CommonInputs {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */
  dataSize = input<Size>(undefined, { alias: 'data-size' })

  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined using theme.designsystemet.no.
   * @attribute data-color
   */
  dataColor = input<Color>(undefined, { alias: 'data-color' })
}
