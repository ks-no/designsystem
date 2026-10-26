import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  resolve: {
    tsconfigPaths: true,
  },
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web-demo',
  server: {
    port: 4202,
    host: 'localhost',
  },
  preview: {
    port: 4302,
    host: 'localhost',
  },
  plugins: [nxReadySignal()],
  build: {
    outDir: '../../dist/apps/web-demo',
    emptyOutDir: true,
    reportCompressedSize: true,
  },
}))
