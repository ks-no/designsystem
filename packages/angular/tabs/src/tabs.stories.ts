import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Meta, moduleMetadata } from '@storybook/angular'
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

   <ksd-tabs>
        <ksd-tabs-list>
          <ksd-tabs-tab value='value1'>Tab 1</ksd-tabs-tab>
          <ksd-tabs-tab value='value2'>Tab 2</ksd-tabs-tab>
        </ksd-tabs-list>
        <ksd-tabs-panel value='value1'>content 1</ksd-tabs-panel>
        <ksd-tabs-panel value='value2'>content 2</ksd-tabs-panel>
      </ksd-tabs>


      <br>





      <ksd-tabs>
        <ksd-tabs-list>
           <ksd-tabs-tab>
            Tab 1
          </ksd-tabs-tab>
          <ksd-tabs-tab>
            Tab 2
          </ksd-tabs-tab>
          <ksd-tabs-tab>
            Tab 3
          </ksd-tabs-tab>
        </ksd-tabs-list>
        <ksd-tabs-panel >
          content 1
        </ksd-tabs-panel>
        <ksd-tabs-panel >
          content 2
        </ksd-tabs-panel>
        <ksd-tabs-panel >
          content 3
        </ksd-tabs-panel>
      </ksd-tabs>
    `,
  }),
}
