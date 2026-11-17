import type { StorybookConfig } from '@storybook/web-components-vite'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import remarkGfm from 'remark-gfm'

const __dirname = dirname(fileURLToPath(import.meta.url))

// www is the single storefront: framework-neutral component pages rendered with web
// components / plain HTML, with the code shown per framework (HTML, Angular, React).
// The Angular Storybook is a separate build, used for Chromatic only.
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    // KS' own web components and CSS patterns, co-located with their source
    {
      directory: '../../../packages/web/src',
      files: '**/*.@(mdx|stories.ts)',
      titlePrefix: 'Komponenter',
    },
  ],
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
    { from: '../../../packages/themes/dist', to: '/css' },
  ],
  previewHead: (head) =>
    `${head}${readFileSync(join(__dirname, '../../../tools/storybook/shared-preview-head.html'), 'utf-8')}`,
  viteFinal: (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@internal/storybook': join(__dirname, '../../../tools/storybook'),
      // Docs blocks and shared args, also used by component pages in packages/web
      '@internal/docs': __dirname,
    }
    return config
  },
}

export default config
