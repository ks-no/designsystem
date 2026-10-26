/// <reference types='vitest' />
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, readdirSync } from 'fs'
import * as path from 'path'
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Copies the project's top-level *.md files (README.md) into the build output
function copyMarkdownPlugin(): Plugin {
  let config: ResolvedConfig
  const markdownFiles = () =>
    readdirSync(config.root).filter(
      (file) => file.endsWith('.md') && !file.startsWith('.'),
    )
  return {
    name: 'copy-markdown',
    apply: 'build',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      for (const file of markdownFiles()) {
        this.addWatchFile(path.join(config.root, file))
      }
    },
    writeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir)
      for (const file of markdownFiles()) {
        copyFileSync(path.join(config.root, file), path.join(outDir, file))
      }
    },
  }
}

export default defineConfig(() => ({
  resolve: {
    tsconfigPaths: true,
  },
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/react',
  plugins: [
    react(),
    copyMarkdownPlugin(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
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
      name: '@ks-digital/designsystem-react',
      fileName: 'index',
      formats: ['es' as const, 'cjs' as const],
    },
    rolldownOptions: {
      external: ['@digdir/designsystemet-react', '@navikt/aksel-icons'],
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/react',
      provider: 'v8' as const,
    },
  },
}))
