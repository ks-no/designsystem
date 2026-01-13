import { Color, Size } from '@ks-digital/designsystem-angular/__internals'

export type CommonArgs = {
  'data-size'?: Size | undefined
  'data-color'?: Color | undefined
}

export const commonArgTypes = {
  'data-size': {
    options: ['sm', 'md', 'lg'],
    control: { type: 'radio' },
  },
  'data-color': {
    options: [
      'accent',
      'neutral',
      'support1',
      'danger',
      'info',
      'success',
      'warning',
    ],
    control: { type: 'radio' },
  },
} satisfies import('@storybook/angular').ArgTypes
