import { addons } from 'storybook/manager-api'

import customTheme from './customTheme'

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
})

// Forward globals changes to ref iframes so composed storybooks can react
addons.getChannel().on('globalsUpdated', (payload) => {
  document.querySelectorAll<HTMLIFrameElement>('iframe').forEach((iframe) => {
    try {
      iframe.contentWindow?.postMessage(
        { key: 'ks-globals-updated', globals: payload.globals },
        '*',
      )
    } catch {}
  })
})
