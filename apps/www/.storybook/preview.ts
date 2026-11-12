// Registers Designsystemet's web components (ds-breadcrumbs, ds-tabs, ds-pagination, …)
import '@digdir/designsystemet-web'
import { themes } from '@internal/storybook/themes'
import type { Preview } from '@storybook/web-components-vite'
import { addons } from 'storybook/preview-api'
import { ComponentPage } from './blocks/ComponentPage'
import { MdxCode, MdxPre } from './blocks/MdxCode'
import { FRAMEWORK_GLOBAL, isFramework } from './blocks/useFramework'
import customTheme from './customTheme'
import './docs.css'
import { withSizeAndColor } from './render'

const FRAMEWORK_STORAGE_KEY = 'ksd-docs-framework'

/** Whether the URL picked a framework, e.g. a shared `&globals=framework:react` link */
function frameworkInUrl(): boolean {
  const urls = [window.location.search]
  try {
    urls.push(window.parent.location.search)
  } catch {
    // Parent on another origin
  }
  return urls.some((search) =>
    (new URLSearchParams(search).get('globals') ?? '').includes(
      `${FRAMEWORK_GLOBAL}:`,
    ),
  )
}

function readStoredFramework(): string | null {
  try {
    return window.localStorage.getItem(FRAMEWORK_STORAGE_KEY)
  } catch {
    return null
  }
}

function storeFramework(framework: unknown): void {
  if (!isFramework(framework)) return
  try {
    window.localStorage.setItem(FRAMEWORK_STORAGE_KEY, framework)
  } catch {
    // Storage can be unavailable (private mode, blocked site data)
  }
}

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
  const scheme = colorScheme ?? 'light'
  document.documentElement.setAttribute('data-color-scheme', scheme)
  // Docs pages render stories inline, so each story root needs the scheme too
  document.querySelectorAll('.docs-story').forEach((el) => {
    el.setAttribute('data-color-scheme', scheme)
  })
}

function applyGlobals(globals: Record<string, string> = {}): void {
  setTheme(globals['theme'])
  setColorScheme(globals['colorScheme'])
}

const channel = addons.getChannel()
channel.on('setGlobals', ({ globals }) => {
  applyGlobals(globals)
  // Restore the reader's framework, unless the URL chose one
  const stored = readStoredFramework()
  if (
    isFramework(stored) &&
    stored !== globals[FRAMEWORK_GLOBAL] &&
    !frameworkInUrl()
  ) {
    channel.emit('updateGlobals', { globals: { [FRAMEWORK_GLOBAL]: stored } })
  }
})
channel.on('globalsUpdated', ({ globals }) => {
  applyGlobals(globals)
  storeFramework(globals[FRAMEWORK_GLOBAL])
})
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
  [FRAMEWORK_GLOBAL]: {
    name: 'Rammeverk',
    description: 'Velg rammeverk for kodeeksempler',
    defaultValue: 'html',
    toolbar: {
      icon: 'markup',
      items: [
        { value: 'html', title: 'HTML' },
        { value: 'angular', title: 'Angular' },
        { value: 'react', title: 'React' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  decorators: [
    withSizeAndColor,
    (story, context) => {
      applyGlobals(context.globals as Record<string, string>)
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
    options: {
      storySort: {
        // Anything not listed below (e.g. the components) is sorted A–Z
        method: 'alphabetical',
        order: [
          'Kom i gang',
          ['Introduksjon', 'Web', 'Angular', 'React'],
          'Design tokens',
          ['Temaer', 'Alle tokens'],
          'Komponenter',
          ['*', ['Docs', 'Preview', '*']],
          'Eksempler',
        ],
      },
    },
    layout: 'centered',
    docs: {
      theme: customTheme,
      // Component stories tagged `autodocs` get this page; MDX pages override it
      page: ComponentPage,
      // Fenced code blocks in MDX get the same frame as CodeBlock
      components: { code: MdxCode, pre: MdxPre },
      story: {
        inline: true,
      },
    },
  },
}

export default preview
