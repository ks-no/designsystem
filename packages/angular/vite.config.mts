/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(() => ({
  resolve: {
    tsconfigPaths: true,
  },
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/angular',
  plugins: [
    angular({
      inlineStylesExtension: 'scss',
    }),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
    }),
  ],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: [
      '**/{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/angular',
      provider: 'v8' as const,
    },
  },
}))
