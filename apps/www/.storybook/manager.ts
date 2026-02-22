import { addons } from 'storybook/manager-api'

import customTheme from './customTheme'

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
})

// Forward globals changes to composed ref iframes
addons.register('ks-globals-forwarder', () => {
  addons.getChannel().on('globalsUpdated', (payload) => {
    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach((iframe) => {
      try {
        iframe.contentWindow?.postMessage(
          { key: 'ksd-globals-updated', globals: payload.globals },
          '*',
        )
      } catch {
        // Silence
      }
    })
  })
})
