import { applicationConfig, type Preview, type StoryContext, type StoryFn } from '@analogjs/storybook-angular';

import { provideZonelessChangeDetection } from '@angular/core';
import { themes } from './themes';

function setTheme(href: string): void {
    let link: HTMLLinkElement | null = document.getElementById(
        'storybook-theme',
    ) as HTMLLinkElement | null
    if (!link) {
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.id = 'storybook-theme'
        document.head.appendChild(link)
    }

  console.log('link', link)
    link.href = href
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
        description: 'Global theme for components',
        defaultValue: themes[0].href,
        toolbar: {
            icon: 'paintbrush',
            items: themes.map((t) => ({ value: t.href, title: t.name })),
            showName: true,
        },
    },
}

export const decorators: object[] = [
    (story: StoryFn, context: StoryContext) => {
        setTheme(context.globals['theme'])
        return story(story, context)
    },
]

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideZonelessChangeDetection()],
    }),
  ],
    parameters: {
        layout: 'centered',
    },
}

export default preview
