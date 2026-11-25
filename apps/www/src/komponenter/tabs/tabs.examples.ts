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

export const withIcons: Snippets = {
  html: `<ds-tabs class="ds-tabs">
  <ds-tablist>
    <ds-tab aria-selected="true">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
      </svg>
      Oversikt
    </ds-tab>
    <ds-tab>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
        <path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z"></path>
      </svg>
      Vedlegg
    </ds-tab>
    <ds-tab>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
        <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path>
      </svg>
      Historikk
    </ds-tab>
  </ds-tablist>
  <ds-tabpanel>Oversikt over søknaden.</ds-tabpanel>
  <ds-tabpanel>Vedlegg du har lastet opp.</ds-tabpanel>
  <ds-tabpanel>Hva som har skjedd i saken.</ds-tabpanel>
</ds-tabs>`,
  angular: `<ksd-tabs>
  <ksd-tabs-list>
    <ksd-tabs-tab tabId="oversikt" aria-selected="true">
      <ng-icon name="phosphorFileText" aria-hidden="true" />
      Oversikt
    </ksd-tabs-tab>
    <ksd-tabs-tab tabId="vedlegg">
      <ng-icon name="phosphorPaperclip" aria-hidden="true" />
      Vedlegg
    </ksd-tabs-tab>
    <ksd-tabs-tab tabId="historikk">
      <ng-icon name="phosphorClockCounterClockwise" aria-hidden="true" />
      Historikk
    </ksd-tabs-tab>
  </ksd-tabs-list>
  <ksd-tabs-panel>Oversikt over søknaden.</ksd-tabs-panel>
  <ksd-tabs-panel>Vedlegg du har lastet opp.</ksd-tabs-panel>
  <ksd-tabs-panel>Hva som har skjedd i saken.</ksd-tabs-panel>
</ksd-tabs>`,
  react: `<Tabs defaultValue="oversikt">
  <Tabs.List>
    <Tabs.Tab value="oversikt">
      <FileText aria-hidden />
      Oversikt
    </Tabs.Tab>
    <Tabs.Tab value="vedlegg">
      <Paperclip aria-hidden />
      Vedlegg
    </Tabs.Tab>
    <Tabs.Tab value="historikk">
      <ClockCounterClockwise aria-hidden />
      Historikk
    </Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="oversikt">Oversikt over søknaden.</Tabs.Panel>
  <Tabs.Panel value="vedlegg">Vedlegg du har lastet opp.</Tabs.Panel>
  <Tabs.Panel value="historikk">Hva som har skjedd i saken.</Tabs.Panel>
</Tabs>`,
}
