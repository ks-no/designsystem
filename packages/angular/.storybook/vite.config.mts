import { mergeConfig, type UserConfig } from 'vite'

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {})
}
