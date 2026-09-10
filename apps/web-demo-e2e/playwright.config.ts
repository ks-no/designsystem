import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig, devices } from '@playwright/test'
import { join } from 'node:path'

const baseURL = process.env['BASE_URL'] || 'http://localhost:4202'

// Vite is invoked directly rather than via `nx run web-demo:serve*`: nesting an Nx
// continuous task inside `nx run web-demo-e2e:e2e` deadlocks on the task lock.
const demoRoot = join(workspaceRoot, 'apps/web-demo')

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: process.env['CI']
    ? {
        // In CI/Docker: serve the pre-built output
        command: 'pnpm exec vite preview --port 4202 --strictPort',
        url: 'http://localhost:4202',
        reuseExistingServer: false,
        cwd: demoRoot,
      }
    : {
        command: 'pnpm exec vite --port 4202 --strictPort',
        url: 'http://localhost:4202',
        reuseExistingServer: true,
        cwd: demoRoot,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
