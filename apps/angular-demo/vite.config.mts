/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/angular-demo',
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
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
  resolve: {
    // preserveSymlinks: true,
    // mainFields: ['module'],
    // dedupe: [
    //   '@angular/core',
    //   '@angular/common',
    //   '@angular/forms',
    //   '@angular/platform-browser',
    //   '@angular/platform-browser-dynamic',
    //   '@angular/router',
    //   'rxjs',
    // ],
  },
}))
