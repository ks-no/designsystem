import {
  attrs,
  indent,
  props,
  text,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

export type TabsArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `// Registrerer <ds-tabs> og resten, én gang i applikasjonen\nimport '@ks-digital/designsystem-web'`,
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

export const preview = (args: TabsArgs): Snippets => ({
  // Tabs and panels are connected by order; the first tab is selected
  html: `<ds-tabs class="ds-tabs"${attrs(args)}>
  <ds-tablist>
${indent(tabs.map((t, i) => `<ds-tab${i === 0 ? ' aria-selected="true"' : ''}>${text(t.label)}</ds-tab>`).join('\n'), 4)}
  </ds-tablist>
${indent(tabs.map((t) => `<ds-tabpanel>${text(t.content)}</ds-tabpanel>`).join('\n'))}
</ds-tabs>`,
  angular: `<ksd-tabs${attrs(args)}>
  <ksd-tabs-list>
${indent(tabs.map((t, i) => `<ksd-tabs-tab tabId="${t.value}"${i === 0 ? ' aria-selected="true"' : ''}>${text(t.label)}</ksd-tabs-tab>`).join('\n'), 4)}
  </ksd-tabs-list>
${indent(tabs.map((t) => `<ksd-tabs-panel>${text(t.content)}</ksd-tabs-panel>`).join('\n'))}
</ksd-tabs>`,
  react: `<Tabs defaultValue="${tabs[0].value}"${props(args)}>
  <Tabs.List>
${indent(tabs.map((t) => `<Tabs.Tab value="${t.value}">${text(t.label)}</Tabs.Tab>`).join('\n'), 4)}
  </Tabs.List>
${indent(tabs.map((t) => `<Tabs.Panel value="${t.value}">${text(t.content)}</Tabs.Panel>`).join('\n'))}
</Tabs>`,
})
