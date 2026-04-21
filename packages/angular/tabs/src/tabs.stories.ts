import { Button } from '@ks-digital/designsystem-angular/button'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { phosphorGear, phosphorUsers } from '@ng-icons/phosphor-icons/regular'
import { argsToTemplate, Meta, moduleMetadata } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Tabs, TabsList, TabsPanel, TabsTab } from './'

type TabsArgs = CommonArgs

const meta: Meta<TabsArgs> = {
  component: Tabs,
  title: 'Tabs',
  argTypes: {
    ...commonArgTypes,
  },
  decorators: [
    moduleMetadata({
      imports: [Tabs, TabsList, TabsTab, TabsPanel, Button, NgIcon],
      providers: [provideIcons({ phosphorUsers, phosphorGear })],
    }),
  ],
}
export default meta
type Story = Meta<Tabs>

export const Preview: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <ksd-tabs ${argsToTemplate(args)}>
        <ksd-tabs-list>
          <ksd-tabs-tab>Tab 1</ksd-tabs-tab>
          <ksd-tabs-tab>Tab 2</ksd-tabs-tab>
        </ksd-tabs-list>
        <ksd-tabs-panel>content 1</ksd-tabs-panel>
        <ksd-tabs-panel>content 2</ksd-tabs-panel>
      </ksd-tabs>
    `,
  }),
}

export const WithIcons: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <ksd-tabs ${argsToTemplate(args)}>
        <ksd-tabs-list>
          <ksd-tabs-tab>
            <ng-icon name="phosphorUsers" />
            <span>Brukere</span>
          </ksd-tabs-tab>
          <ksd-tabs-tab>
            <ng-icon name="phosphorGear" />
            <span>Innstillinger</span>
          </ksd-tabs-tab>
        </ksd-tabs-list>
        <ksd-tabs-panel>Innhold for Brukere</ksd-tabs-panel>
        <ksd-tabs-panel>Innhold for Innstillinger</ksd-tabs-panel>
      </ksd-tabs>
    `,
  }),
}
