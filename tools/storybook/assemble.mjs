import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = join(process.cwd(), 'dist/storybook/@ks-digital')
const composedDist = join(root, 'assembled')

console.log('🔨 Building web storybook')
execSync(
  'nx run @ks-digital/designsystem-web:build-storybook --skip-nx-cache',
  {
    stdio: 'inherit',
    env: { ...process.env, STORYBOOK_BASE_URL: '/web/' },
  },
)

console.log('🔨 Building angular storybook')
execSync(
  'nx run @ks-digital/designsystem-angular:build-storybook --skip-nx-cache',
  {
    stdio: 'inherit',
    env: { ...process.env, STORYBOOK_BASE_URL: '/angular/' },
  },
)

console.log('🔨 Building react storybook')
execSync(
  'nx run @ks-digital/designsystem-react:build-storybook --skip-nx-cache',
  {
    stdio: 'inherit',
    env: { ...process.env, STORYBOOK_BASE_URL: '/react/' },
  },
)

console.log('🔨 Building www')
execSync('nx run www:build-storybook --skip-nx-cache', {
  stdio: 'inherit',
  env: {
    ...process.env,
    STORYBOOK_WEB_URL: '/web',
    STORYBOOK_REACT_URL: '/react',
    STORYBOOK_ANGULAR_URL: '/angular',
  },
})

rmSync(composedDist, { recursive: true, force: true })
mkdirSync(composedDist, { recursive: true })
cpSync(join(root, 'www'), composedDist, { recursive: true })
cpSync(join(root, 'designsystem-web'), join(composedDist, 'web'), {
  recursive: true,
})
cpSync(join(root, 'designsystem-angular'), join(composedDist, 'angular'), {
  recursive: true,
})
cpSync(join(root, 'designsystem-react'), join(composedDist, 'react'), {
  recursive: true,
})

console.log(`✅ Assembled composed storybook`)
