import { Color } from '../src/components/colors'
import { Size } from '../src/components/common-inputs'

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
    options: ['accent', 'neutral', 'danger', 'info', 'success', 'warning'],
    control: { type: 'radio' },
  },
} satisfies import('@storybook/angular').ArgTypes
