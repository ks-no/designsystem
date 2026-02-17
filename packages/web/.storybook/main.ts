import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: [
    // Map the local themes directory to a public path
    { from: '../../themes/dist', to: '/css' },
  ],
}

export default config
