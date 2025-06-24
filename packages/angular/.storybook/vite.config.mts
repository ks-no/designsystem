import path from 'node:path';
import { mergeConfig, type UserConfig } from 'vite';

export default async function viteFinal(config: UserConfig) {
  return mergeConfig(config, {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: `${path.resolve(__dirname, 'styles.css')}`,
        },
      },
    },
  });
}