import { StoryObj } from '@storybook/angular'
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
    options: [
      'accent',
      'brand1',
      'brand2',
      'brand3',
      'neutral',
      'danger',
      'info',
      'success',
      'warning',
    ],
    control: { type: 'radio' },
  },
}

/**
 * Storybook typings doesnt work for aliased inputs, so we make a custom type
 * https://github.com/storybookjs/storybook/issues/29697
 * @see {@link ../components/common-inputs.CommonInputs}
 */
export type StorybookArgsWithCommonInputs<T> = StoryObj<T>['args'] & CommonArgs
