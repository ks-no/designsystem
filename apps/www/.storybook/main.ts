import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
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
    '02-react': {
      title: 'React',
      url: process.env.STORYBOOK_REACT_URL || 'http://localhost:4403',
    },
    '03-angular': {
      title: 'Angular',
      url: process.env.STORYBOOK_ANGULAR_URL || 'http://localhost:4400',
    },
  },
  staticDirs: [
    // Map the local themes directory to a public path
    { from: '../../../packages/themes/dist', to: '/css' },
  ],
  previewHead: (head) =>
    `${head}${readFileSync(join(__dirname, '../../../tools/storybook/shared-preview-head.html'), 'utf-8')}`,
  viteFinal: (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@internal/storybook': join(__dirname, '../../../tools/storybook'),
    }
    return config
  },
}

export default config
