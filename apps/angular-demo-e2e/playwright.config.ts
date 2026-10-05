import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig, devices } from '@playwright/test'
import { join } from 'node:path'

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200'

// The server is started directly rather than via `nx run angular-demo:serve*`: nesting an
// Nx continuous task inside `nx run angular-demo-e2e:e2e` deadlocks on the task lock.
const buildOutput = join(workspaceRoot, 'dist/apps/angular-demo')

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: process.env['CI']
    ? {
        // In CI/Docker: serve the pre-built output with a static server
        command:
          'pnpm exec vite preview --outDir browser --port 4200 --strictPort',
        url: 'http://localhost:4200',
        reuseExistingServer: false,
        cwd: buildOutput,
      }
    : {
        command: 'pnpm exec nx run angular-demo:serve',
        url: 'http://localhost:4200',
        reuseExistingServer: true,
        cwd: workspaceRoot,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
})
