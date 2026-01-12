/* eslint-disable @angular-eslint/no-input-rename */

/**
 * We use input aliasing to bridge the gap between Angular's camelCase property naming convention and our HTML data attributes.
 * This approach allows us to use valid HTML data attributes as documented by Designsystemet while maintaining
 * proper TypeScript intellisense support.
 *
 * Todo: Some components are using only a subset of colors, e.g., SeverityColors for Alert. We should reconsider this directive
 */

import { Directive, input } from '@angular/core'

import {
  ColorDefinitions,
  SeverityColorDefinitions,
  Size as SizeDefinition,
} from '@digdir/designsystemet/types'

export type { Color, SeverityColors, Size } from '@digdir/designsystemet/types'

/**
 * @deprecated Use individual directives instead
 */
@Directive({
  host: {
    '[attr.data-size]': 'dataSize() || null',
    '[attr.data-color]': 'dataColor() || null',
  },
})
export class CommonInputs {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */
  dataSize = input<SizeDefinition>(undefined, { alias: 'data-size' })

  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined using theme.designsystemet.no.
   * @attribute data-color
   */
  dataColor = input<ColorDefinitions>(undefined, { alias: 'data-color' })
}

@Directive({
  host: {
    '[attr.data-size]': 'dataSize() || null',
  },
})
export class HostSize {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */
  dataSize = input<SizeDefinition>(undefined, { alias: 'data-size' })
}

@Directive({
  host: {
    '[attr.data-color]': 'dataColor() || null',
  },
})
export class HostColor {
  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined using theme.designsystemet.no.
   * @attribute data-color
   */
  dataColor = input<ColorDefinitions>(undefined, { alias: 'data-color' })
}

@Directive({
  host: {
    '[attr.data-color]': 'dataColor() || null',
  },
})
export class HostSeverityColors {
  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined using theme.designsystemet.no.
   * @attribute data-color
   */
  dataColor = input<SeverityColorDefinitions>(undefined, {
    alias: 'data-color',
  })
}
