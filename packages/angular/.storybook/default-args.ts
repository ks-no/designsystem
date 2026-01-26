import { SeverityColorDefinitions } from '@digdir/designsystemet/types'
import { Color, Size } from '@ks-digital/designsystem-angular/__internals'

export const themeColors: (Color | SeverityColorDefinitions)[] = [
  'accent',
  'neutral',
  'support1',
  'danger',
  'info',
  'success',
  'warning',
]

export const sizes = ['sm', 'md', 'lg'] as const

export type CommonArgs = {
  'data-size'?: Size | undefined
  'data-color'?: Color | undefined
}

export const commonArgTypes = {
  'data-size': {
    options: [...sizes],
    control: { type: 'radio' },
  },
  'data-color': {
    options: [...themeColors],
    control: { type: 'radio' },
  },
} satisfies import('@storybook/angular').ArgTypes
