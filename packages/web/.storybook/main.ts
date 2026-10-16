import type { StorybookConfig } from '@storybook/web-components-vite'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import remarkGfm from 'remark-gfm'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // MDX 3 has no GFM, so tables render as literal pipes without remark-gfm
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: { remarkPlugins: [remarkGfm] },
        },
      },
    },
  ],
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
  previewHead: (head) =>
    `${head}${readFileSync(join(__dirname, '../../../tools/storybook/shared-preview-head.html'), 'utf-8')}`,
  viteFinal: (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@internal/storybook': join(__dirname, '../../../tools/storybook'),
    }
    if (process.env['STORYBOOK_BASE_URL']) {
      config.base = process.env['STORYBOOK_BASE_URL']
    }
    return config
  },
}

export default config
