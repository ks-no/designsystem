import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type TabsArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@ks-digital/designsystem-angular/tabs'`,
  react: `import { Tabs } from '@ks-digital/designsystem-react'`,
}

const tabs = [
  { value: 'oversikt', label: 'Oversikt', content: 'Oversikt over søknaden.' },
  { value: 'vedlegg', label: 'Vedlegg', content: 'Vedlegg du har lastet opp.' },
  {
    value: 'historikk',
    label: 'Historikk',
    content: 'Hva som har skjedd i saken.',
  },
]

const Tabs = component({
  html: 'ds-tabs.ds-tabs',
  angular: 'ksd-tabs',
  react: 'Tabs',
})
const TabList = component({
  html: 'ds-tablist',
  angular: 'ksd-tabs-list',
  react: 'Tabs.List',
})
const Tab = component({
  html: 'ds-tab',
  angular: 'ksd-tabs-tab',
  react: 'Tabs.Tab',
})
const Panel = component({
  html: 'ds-tabpanel',
  angular: 'ksd-tabs-panel',
  react: 'Tabs.Panel',
})

// HTML and Angular connect tabs and panels by order, with the first tab selected.
// React connects them by value, and selects the first with defaultValue.
export const preview = (args: TabsArgs) =>
  snippets(
    Tabs(
      { defaultValue: per({ react: tabs[0].value }), ...args },
      TabList(
        {},
        ...tabs.map((t, i) =>
          Tab(
            {
              tabId: per({ angular: t.value }),
              value: per({ react: t.value }),
              'aria-selected': per({ react: null, default: i === 0 && 'true' }),
            },
            t.label,
          ),
        ),
      ),
      ...tabs.map((t) => Panel({ value: per({ react: t.value }) }, t.content)),
    ),
  )
