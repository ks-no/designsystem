import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { mergeConfig, type UserConfig } from 'vite'

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {
    plugins: [
      // Make Vite respect our tsconfig path aliases (e.g. @ks-digital/designsystem-angular/field)
      nxViteTsPaths(),
      {
        name: 'cors-fix',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const origin = req.headers.origin
            if (origin) {
              res.setHeader('Access-Control-Allow-Origin', origin)
              res.setHeader('Access-Control-Allow-Credentials', 'true')
              res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS',
              )
              res.setHeader(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization',
              )
            }
            if (req.method === 'OPTIONS') {
              res.statusCode = 204
              res.end()
              return
            }
            next()
          })
        },
      },
    ],
  })
}
