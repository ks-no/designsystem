import { Button } from '@ks-digital/designsystem-angular/button'
import { argsToTemplate, Meta, moduleMetadata } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Tabs, TabsList, TabsPanel, TabsTab } from './'

type TabsArgs = CommonArgs

const meta: Meta<TabsArgs> = {
  component: Tabs,
  title: 'Komponenter/Tabs',
  argTypes: {
    ...commonArgTypes,
  },
  decorators: [
    moduleMetadata({
      imports: [Tabs, TabsList, TabsTab, TabsPanel, Button],
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
