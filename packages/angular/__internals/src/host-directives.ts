import { Directive, input } from '@angular/core'
import {
  ColorDefinitions,
  SeverityColorDefinitions,
  Size,
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
  readonly dataSize = input<Size>(undefined, {
    alias: 'data-size',
  })

  /**
   * Changes color for descendant Designsystemet components.
   * Select from predefined colors and colors defined in theme.
   * @attribute data-color
   */
  readonly dataColor = input<keyof ColorDefinitions>(undefined, {
    alias: 'data-color',
  })
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
  readonly dataSize = input<Size>(undefined, {
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
   * Select from predefined colors and colors defined in theme.
   * @attribute data-color
   */
  readonly dataColor = input<
    keyof ColorDefinitions | keyof SeverityColorDefinitions
  >(undefined, { alias: 'data-color' })
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
   * Select from predefined colors and colors defined in theme.
   * @attribute data-color
   */
  readonly dataColor = input<keyof SeverityColorDefinitions>(undefined, {
    alias: 'data-color',
  })
}
