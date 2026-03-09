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

// Forward globals changes to composed ref iframes
addons.register('ks-globals-forwarder', () => {
  addons.getChannel().on('globalsUpdated', (payload) => {
    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach((iframe) => {
      try {
        const iframeUrl = iframe.src
          ? new URL(iframe.src, window.location.href)
          : null
        const targetOrigin = iframeUrl
          ? iframeUrl.origin
          : window.location.origin
        iframe.contentWindow?.postMessage(
          { key: 'ksd-globals-updated', globals: payload.globals },
          targetOrigin,
        )
      } catch {
        // Silence
      }
    })
  })
})
