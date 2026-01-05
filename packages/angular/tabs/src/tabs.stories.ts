import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Meta, moduleMetadata } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Tabs, TabsList, TabsPanel, TabsTab } from './'

type TabsArgs = CommonArgs & {
  defaultValue?: string
}

const meta: Meta<TabsArgs> = {
  component: Tabs,
  title: 'Komponenter/Tabs',
  argTypes: {
    ...commonArgTypes,
    defaultValue: {
      control: { type: 'text' },
      description: 'Default selected tab value',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Tabs, TabsList, TabsTab, TabsPanel, Button],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
}
export default meta
type Story = Meta<Tabs>

export const Preview: Story = {
  args: { defaultValue: 'value1' },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
<u-tabs class="ds-tabs">
  <u-tablist>
    <u-tab>Tab 1</u-tab>
    <u-tab>Tab 2</u-tab>
    <u-tab>Tab 3</u-tab>
  </u-tablist>
  <u-tabpanel>Panel 1 with <a href="#">link</a></u-tabpanel>
  <u-tabpanel>Panel 2 with <a href="#">link</a></u-tabpanel>
  <u-tabpanel>Panel 3 with <a href="#">link</a></u-tabpanel>
</u-tabs>

<br /><br />  


      <ksd-tabs [defaultValue]='defaultValue'>
        <ksd-tabs-list>
           <button ksd-tabs-tab value="value1">
            Tab 1
          </button>
          <button ksd-tabs-tab value="value2">
            Tab 2
          </button>
          <button ksd-tabs-tab value="value3">
            Tab 3
          </button>
        </ksd-tabs-list>
        <ksd-tabs-panel value='value1'>
          content 1
        </ksd-tabs-panel>
        <ksd-tabs-panel value='value2'>
          content 2
        </ksd-tabs-panel>
        <ksd-tabs-panel value='value3'>
          content 3
        </ksd-tabs-panel>
      </ksd-tabs>
    `,
  }),
}
