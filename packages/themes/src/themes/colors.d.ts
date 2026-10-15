/* This file is deprecated and will be removed in a future release. Use types.d.ts instead */
/* build: v1.21.0 */
import type {} from '@digdir/designsystemet-types'

// Augment types based on theme
declare module '@digdir/designsystemet-types' {
  export interface ColorDefinitions {
    accent: never
    support1: never
    support2: never
    support3: never
    support4: never
    support5: never
    support6: never
    support7: never
    support8: never
    neutral: never
  }
  export interface SeverityColorDefinitions {
    info: never
    success: never
    warning: never
    danger: never
  }
}
