import type { StorybookConfig } from 'storybook'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  refs: {
    angular: {
      title: 'Angular',
      url: process.env.STORYBOOK_ANGULAR_URL || 'http://localhost:4400',
    },
    web: {
      title: 'Web Components',
      url: process.env.STORYBOOK_WEB_URL || 'http://localhost:4401',
    },
  },
}

export default config
