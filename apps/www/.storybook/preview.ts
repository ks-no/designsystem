import type { Preview } from 'storybook'
import customTheme from './customTheme'

const preview: Preview = {
  parameters: {
    docs: {
      theme: customTheme,
    },
  },
}

export default preview
