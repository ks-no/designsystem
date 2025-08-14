import Icons from 'unplugin-icons/vite'
import { mergeConfig, type UserConfig } from 'vite'

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {
    plugins: [
      Icons({
        compiler: 'web-components',
        webComponents: {
          autoDefine: true,
        },
      }),
    ],
  })
}
