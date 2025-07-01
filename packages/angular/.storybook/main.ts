import { StorybookConfig } from '@analogjs/storybook-angular'

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-docs'],
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
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
