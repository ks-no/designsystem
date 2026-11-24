import type { Imports, Snippets } from '@internal/storybook/snippets'

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

export const preview: Snippets = {
  html: `<ds-tabs class="ds-tabs">
  <ds-tablist>
    <ds-tab aria-selected="true">Oversikt</ds-tab>
    <ds-tab>Vedlegg</ds-tab>
    <ds-tab>Historikk</ds-tab>
  </ds-tablist>
  <ds-tabpanel>Oversikt over søknaden.</ds-tabpanel>
  <ds-tabpanel>Vedlegg du har lastet opp.</ds-tabpanel>
  <ds-tabpanel>Hva som har skjedd i saken.</ds-tabpanel>
</ds-tabs>`,
  angular: `<ksd-tabs>
  <ksd-tabs-list>
    <ksd-tabs-tab tabId="oversikt" aria-selected="true">Oversikt</ksd-tabs-tab>
    <ksd-tabs-tab tabId="vedlegg">Vedlegg</ksd-tabs-tab>
    <ksd-tabs-tab tabId="historikk">Historikk</ksd-tabs-tab>
  </ksd-tabs-list>
  <ksd-tabs-panel>Oversikt over søknaden.</ksd-tabs-panel>
  <ksd-tabs-panel>Vedlegg du har lastet opp.</ksd-tabs-panel>
  <ksd-tabs-panel>Hva som har skjedd i saken.</ksd-tabs-panel>
</ksd-tabs>`,
  react: `<Tabs defaultValue="oversikt">
  <Tabs.List>
    <Tabs.Tab value="oversikt">Oversikt</Tabs.Tab>
    <Tabs.Tab value="vedlegg">Vedlegg</Tabs.Tab>
    <Tabs.Tab value="historikk">Historikk</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="oversikt">Oversikt over søknaden.</Tabs.Panel>
  <Tabs.Panel value="vedlegg">Vedlegg du har lastet opp.</Tabs.Panel>
  <Tabs.Panel value="historikk">Hva som har skjedd i saken.</Tabs.Panel>
</Tabs>`,
}
