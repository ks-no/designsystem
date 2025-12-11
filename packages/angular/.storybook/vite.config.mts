import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { mergeConfig, type UserConfig } from 'vite'

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {
    plugins: [
      // Make Vite respect our tsconfig path aliases (e.g. @ks-digital/designsystem-angular/field)
      nxViteTsPaths(),
    ],
  })
}
