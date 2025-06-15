import { Directive, input } from '@angular/core'
import { Color } from './colors'

export type Size = 'sm' | 'md' | 'lg' | 'xl'

@Directive()
export class CommonInputs {
    /**
     * Changes size for descendant Designsystemet components. Select from predefined sizes.
     */
    'data-size' = input<Size>()

    /**
     * Changes color for descendant Designsystemet components.
     * Select from predefined colors and colors defined using theme.designsystemet.no.
     */
    'data-color' = input<Color>()
}
