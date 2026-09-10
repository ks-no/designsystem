import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env['BASE_URL'] || 'http://localhost:4202'

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
        // In CI/Docker: serve the pre-built output with a static server
        command: 'pnpm exec nx run web-demo:serve-static --port 4202',
        url: 'http://localhost:4202',
        reuseExistingServer: false,
        cwd: workspaceRoot,
      }
    : {
        command: 'pnpm exec nx run web-demo:serve',
        url: 'http://localhost:4202',
        reuseExistingServer: true,
        cwd: workspaceRoot,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
