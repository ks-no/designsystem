import { addons } from 'storybook/manager-api'

import customTheme from './customTheme'

const sidebarSearchPlaceholder = 'Søk'

const updateSidebarSearchPlaceholder = () => {
  const searchInputs = document.querySelectorAll<HTMLInputElement>(
    'input[placeholder="Find components"], input[placeholder="Type to find..."]',
  )

  searchInputs.forEach((input) => {
    input.placeholder = sidebarSearchPlaceholder
  })
}

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
})

updateSidebarSearchPlaceholder()

const placeholderObserver = new MutationObserver(() => {
  updateSidebarSearchPlaceholder()
})

placeholderObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['placeholder'],
})
