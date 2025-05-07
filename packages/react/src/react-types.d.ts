import type { Size } from '@digdir/designsystemet-react'
import type { Color } from '@digdir/designsystemet-react/colors'

/*
 * Typing of data-size and data-color attributes in React components.
 */
declare global {
  namespace React {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
      'data-size'?: Size | (string & {})
      'data-color'?: Color | (string & {})
    }
  }
}
