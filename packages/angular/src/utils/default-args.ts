import { StoryObj } from '@storybook/angular'
import { Color } from '../components/colors'
import { Size } from '../components/common-inputs'

/**
 * Storybook typings doesnt work for aliased inputs, so we make a custom type
 * https://github.com/storybookjs/storybook/issues/29697
 * @see {@link ../components/common-inputs.CommonInputs}
 */
export type StorybookArgsWithCommonInputs<T> = StoryObj<T>['args'] & {
  'data-size'?: Size | undefined
  'data-color'?: Color | undefined
}
