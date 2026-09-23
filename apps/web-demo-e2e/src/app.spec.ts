import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // Wait for fonts and web components to settle
  await page.waitForLoadState('load')
})

const sections = [
  'Copy Button',
  'Copy Button Icon Only',
  'Copy Button States',
  'Copy Button In Text',
  'Summary List',
  'Summary List Narrow',
  'Summary List With Actions',
]

for (const title of sections) {
  test(`${title} — visual snapshot`, async ({ page }) => {
    const section = page
      .locator('section')
      .filter({ has: page.locator(`h2:text-is("${title}")`) })

    await expect(section).toHaveScreenshot(
      `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`,
    )
  })
}
