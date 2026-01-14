import { SizeDefinition } from '@ks-digital/designsystem-themes/types'

/**
 * Extended size includes the regular size options plus some additional sizes that some components support
 */
export type ExtendedSize = keyof SizeDefinition | 'xs' | 'xl' | '2xs'
