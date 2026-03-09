import { themes } from '@internal/storybook/themes'
import type { Preview } from '@storybook/web-components'
import { addons } from 'storybook/preview-api'
import customTheme from './customTheme'

addons.getChannel().on('globalsUpdated', ({ globals }) => {
  setTheme(globals.theme)
  setColorScheme(globals.colorScheme)
})

const allowedMessageOrigins = new Set<string>([window.location.origin])

if (document.referrer) {
  try {
    allowedMessageOrigins.add(new URL(document.referrer).origin)
  } catch {
    // Ignore invalid referrer URL
  }
}

// Composition mode: receive forwarded globals from www manager.ts
window.addEventListener('message', (event) => {
  if (!allowedMessageOrigins.has(event.origin)) return
  if (event.data?.key !== 'ksd-globals-updated') return
  const globals = event.data.globals
  if (globals) {
    setTheme(globals.theme)
    setColorScheme(globals.colorScheme)
  }
})

function setTheme(href: string): void {
  let link: HTMLLinkElement | null = document.getElementById(
    'storybook-theme',
  ) as HTMLLinkElement | null
  href = href ?? themes[0].href
  if (!link) {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.id = 'storybook-theme'
    document.head.appendChild(link)
  }
  link.href = href
}

function setColorScheme(colorScheme: 'light' | 'dark' | 'auto'): void {
  document.documentElement.setAttribute('data-color-scheme', colorScheme)
  document.querySelectorAll('.docs-story').forEach((el) => {
    el.setAttribute('data-color-scheme', colorScheme)
  })
}

type ThemeGlobalType = {
  name: string
  description: string
  defaultValue: string
  toolbar: {
    icon: string
    items: Array<{ value: string; title: string }>
    showName: boolean
  }
}

export const globalTypes: Record<string, ThemeGlobalType> = {
  theme: {
    name: 'Theme',
    description: 'Velg tema for stories',
    defaultValue: themes[0].href,
    toolbar: {
      icon: 'paintbrush',
      items: themes.map((t) => ({ value: t.href, title: t.name })),
      showName: true,
    },
  },
  colorScheme: {
    name: 'Color Scheme',
    description: 'Velg lys/dark-mode for stories',
    defaultValue: 'light',
    toolbar: {
      icon: 'moon',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
        { value: 'auto', title: 'Auto' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  decorators: [
    (story, context) => {
      setTheme(context.globals['theme'])
      setColorScheme(context.globals['colorScheme'] || 'light')
      return story()
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      theme: customTheme,
    },
  },
}

export default preview
