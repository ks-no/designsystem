import { StorybookConfig } from '@analogjs/storybook-angular'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))', './**/*.mdx'],
  addons: ['@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@analogjs/storybook-angular',
    options: {
      builder: {
        viteConfigPath: 'packages/angular/.storybook/vite.config.mts',
      },
    },
  },
  staticDirs: [
    // Map the local themes directory to a public path
    { from: '../../themes/dist', to: '/css' },
  ],
  previewHead: (head) =>
    `${head}${readFileSync(join(__dirname, '../../../tools/storybook/shared-preview-head.html'), 'utf-8')}`,
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
