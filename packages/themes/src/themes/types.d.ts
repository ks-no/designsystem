/* build: v1.7.3 */
import type {} from '@digdir/designsystemet/types'

// Augment types based on theme
declare module '@digdir/designsystemet/types' {
  export interface ColorDefinitions {
    primary: never
    accent: never
    extra1: never
    extra2: never
    extra3: never
    neutral: never
  }
  export interface SeverityColorDefinitions {
    info: never
    success: never
    warning: never
    danger: never
  }
}
