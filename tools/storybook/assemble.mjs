import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

// The docs site is www alone. The Angular Storybook is built separately for Chromatic.
const root = join(process.cwd(), 'dist/storybook/@ks-digital')
const composedDist = join(root, 'assembled')

console.log('🔨 Building www')
execSync('nx run www:build-storybook', { stdio: 'inherit' })

rmSync(composedDist, { recursive: true, force: true })
mkdirSync(composedDist, { recursive: true })
cpSync(join(root, 'www'), composedDist, { recursive: true })

console.log(`✅ Assembled storybook`)
