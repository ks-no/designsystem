/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/angular',
  plugins: [
    angular({
      inlineStylesExtension: 'scss',
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  optimizeDeps: {
    include: ['@digdir/designsystemet-css'],
  },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: '@ks-digital/designsystem-angular',
      fileName: 'index',
      formats: ['es' as const],
    },
    rollupOptions: {
      external: [
        '@digdir/designsystemet-css',
        '@digdir/designsystemet-angular',
      ],
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/angular',
      provider: 'v8' as const,
    },
  },
}))
