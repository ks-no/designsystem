import type { Preview } from 'storybook'
import customTheme from './customTheme'

const preview: Preview = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  layout: 'centered',
  parameters: {
    docs: {
      theme: customTheme,
    },
  },
}

export default preview
