import type { StorybookConfig } from 'storybook'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  refs: {
    '01-web': {
      title: 'Web',
      url: process.env.STORYBOOK_WEB_URL || 'http://localhost:4401',
    },
    '02-angular': {
      title: 'Angular',
      url: process.env.STORYBOOK_ANGULAR_URL || 'http://localhost:4400',
    },
  },
}

export default config
