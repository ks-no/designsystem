/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/angular',
  plugins: [
    angular({
      inlineStylesExtension: 'scss',
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
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
}))
