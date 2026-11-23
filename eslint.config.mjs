import nx from '@nx/eslint-plugin'
import noUnsanitized from 'eslint-plugin-no-unsanitized'

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/test-setup.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?js$',
            // Docs blocks and story helpers in apps/www, shared with the docs pages in packages/web
            '^@internal/docs/.*$',
          ],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
  {
    // Blocks innerHTML/outerHTML/insertAdjacentHTML/document.write/DOMParser, all of which
    // Trusted Types rejects. Shipped code builds DOM nodes instead; specs may use innerHTML.
    files: ['packages/*/src/**/*.ts', 'packages/*/src/**/*.tsx'],
    ignores: ['**/*.spec.ts', '**/*.stories.ts'],
    plugins: { 'no-unsanitized': noUnsanitized },
    rules: {
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
    },
  },
  {
    // Docs: stories may render args, which can be set from the URL. Turning strings
    // into HTML happens only in parseExample (apps/www/.storybook/render.ts).
    files: [
      'apps/www/**/*.ts',
      'apps/www/**/*.tsx',
      'packages/*/src/**/*.stories.ts',
    ],
    plugins: { 'no-unsanitized': noUnsanitized },
    rules: {
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lit/directives/unsafe-html.js',
              message: 'Use parseExample from apps/www/.storybook/render.ts',
            },
            {
              name: 'lit/static-html.js',
              importNames: ['unsafeStatic'],
              message: 'Use parseExample from apps/www/.storybook/render.ts',
            },
          ],
        },
      ],
    },
  },
]
