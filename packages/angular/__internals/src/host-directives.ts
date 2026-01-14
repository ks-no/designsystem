/* eslint-disable @angular-eslint/no-input-rename */

import { Directive, input } from '@angular/core'
import {
  ColorDefinitions,
  SeverityColorDefinitions,
  SizeDefinition,
} from '@ks-digital/designsystem-themes/types'

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
  dataSize = input<keyof SizeDefinition>(undefined, { alias: 'data-size' })

  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined using theme.designsystemet.no.
   * @attribute data-color
   */
  dataColor = input<keyof ColorDefinitions>(undefined, { alias: 'data-color' })
}

/**
 * Applies data-size attribute to host-element.
 */
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
  dataSize = input<keyof SizeDefinition>(undefined, { alias: 'data-size' })
}

/**
 * Applies data-size attribute to host-element.
 * Includes more size options than HostSize.
 */
@Directive({
  host: {
    '[attr.data-size]': 'dataSize() || null',
  },
})
export class HostSizeExtended {
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */
  readonly dataSize = input<SizeDefinition | 'xs' | 'xl' | '2xs'>(undefined, {
    alias: 'data-size',
  })
}

/**
 * Applies data-color attribute to host-element for all colors, including severity colors.
 */
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
  dataColor = input<keyof ColorDefinitions | keyof SeverityColorDefinitions>(
    undefined,
    { alias: 'data-color' },
  )
}

/**
 * Applies data-color attribute to host-element for severity colors.
 */
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
  dataColor = input<keyof SeverityColorDefinitions>(undefined, {
    alias: 'data-color',
  })
}
