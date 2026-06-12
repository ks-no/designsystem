import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // Wait for fonts and web components to settle
  await page.waitForLoadState('load')
})

const sections = [
  'Breadcrumbs',
  'Alerts',
  'Typography',
  'Buttons',
  'Tags & Chips',
  'Forms',
  'Error Summary',
  'Search',
  'Tabs',
  'Table',
  'Card',
  'Details',
  'Spinner',
  'Pagination',
  'Dialog, Dropdown & Popover',
  'Suggestion',
]

for (const title of sections) {
  test(`${title} — visual snapshot`, async ({ page }) => {
    const section = page
      .locator('section')
      .filter({ has: page.locator(`h2:text("${title}")`) })

    await expect(section).toHaveScreenshot(
      `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`,
    )
  })
}
