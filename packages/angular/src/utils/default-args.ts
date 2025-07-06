import { StoryObj } from '@storybook/angular'
import { Color } from '../components/colors'
import { Size } from '../components/common-inputs'

/**
 * Storybook don't understand the data-* inputs, so we make a custom type that includes the common inputs
 * @see {@link ../components/common-inputs.CommonInputs}
 */
export type StorybookArgsWithCommonInputs<T> = StoryObj<T>['args'] & {
  'data-size'?: Size | undefined
  'data-color'?: Color | undefined
}
