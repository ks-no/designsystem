import type { ArgTypes } from '@storybook/web-components-vite'

export const themeColors = [
  'accent',
  'neutral',
  'support1',
  'danger',
  'info',
  'success',
  'warning',
] as const

export const sizes = ['sm', 'md', 'lg'] as const

/** Controls for the `data-size` / `data-color` attributes most components accept */
export const commonArgTypes = {
  'data-size': {
    options: [...sizes],
    control: { type: 'radio' },
  },
  'data-color': {
    options: [...themeColors],
    control: { type: 'radio' },
  },
} satisfies ArgTypes
