/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular'
import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  resolve: {
    tsconfigPaths: true,
  },
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/angular-demo',
  plugins: [angular(), nxReadySignal()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/angular-demo',
      provider: 'v8' as const,
    },
  },
}))
