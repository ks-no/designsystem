import { dirname, resolve } from 'path'
import postcssImport from 'postcss-import'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  plugins: [
    postcssImport({
      path: [resolve(__dirname, '../../node_modules')],
    }),
  ],
}
