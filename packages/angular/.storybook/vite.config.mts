import { mergeConfig, type UserConfig } from 'vite'

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {
    build: {
      minify: false, // disable terser/minification
      sourcemap: true, // generate sourcemaps for readable errors
    },
  })
}
