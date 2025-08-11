import { StoryObj } from '@storybook/angular'
import { Color } from '../components/colors'
import { Size } from '../components/common-inputs'

/**
 * Storybook doesnt include inputs from hostdirectives, so we make a custom type
 * @see {@link ../components/common-inputs.CommonInputs}
 */
export type StorybookArgsWithCommonInputs<T> = StoryObj<T>['args'] & {
  'data-size'?: Size | undefined
  'data-color'?: Color | undefined
}
