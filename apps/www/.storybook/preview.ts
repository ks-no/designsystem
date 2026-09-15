import { themes } from '@internal/storybook/themes'
import { addons } from 'storybook/preview-api'
import customTheme from './customTheme'

function setTheme(href?: string): void {
  let link = document.getElementById(
    'storybook-theme',
  ) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.id = 'storybook-theme'
    document.head.appendChild(link)
  }
  link.href = href ?? themes[0].href
}

function setColorScheme(colorScheme?: string): void {
  document.documentElement.setAttribute(
    'data-color-scheme',
    colorScheme ?? 'light',
  )
}

function applyGlobals(globals: Record<string, string> = {}): void {
  setTheme(globals['theme'])
  setColorScheme(globals['colorScheme'])
}

const channel = addons.getChannel()
channel.on('setGlobals', ({ globals }) => applyGlobals(globals))
channel.on('globalsUpdated', ({ globals }) => applyGlobals(globals))
applyGlobals()

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

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduksjon', 'Temaer', 'Tokens', 'Ikoner'],
      },
    },
    layout: 'centered',
    docs: {
      theme: customTheme,
    },
  },
}

export default preview
