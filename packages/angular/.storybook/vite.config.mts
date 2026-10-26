import { mergeConfig, type UserConfig } from 'vite'

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
    resolve: {
      // Make Vite respect our tsconfig path aliases
      tsconfigPaths: true,
      dedupe: [
        '@angular/core',
        '@angular/common',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
      ],
    },
  })
}
