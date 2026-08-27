import { fireEvent, render, screen } from '@testing-library/angular'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Tabs, TabsList, TabsPanel, TabsTab } from '.'

describe('Tabs', () => {
  it('should have no obvious accessibility violations', async () => {
    const { container } = await render(
      `<ksd-tabs>
				<ksd-tabs-list>
					<ksd-tabs-tab>Tab 1</ksd-tabs-tab>
					<ksd-tabs-tab>Tab 2</ksd-tabs-tab>
				</ksd-tabs-list>
			</ksd-tabs>
      `,
      {
        imports: [Tabs, TabsList, TabsTab, TabsPanel],
      },
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should emit tabClicked from ksd-tabs when a tab is clicked', async () => {
    const onTabClicked = vi.fn()

    await render(
      `
        <ksd-tabs (tabClicked)="onTabClicked($event)">
          <ksd-tabs-list>
            <ksd-tabs-tab tabId="tab-1">Tab 1</ksd-tabs-tab>
            <ksd-tabs-tab tabId="tab-2">Tab 2</ksd-tabs-tab>
          </ksd-tabs-list>
          <ksd-tabs-panel>content 1</ksd-tabs-panel>
          <ksd-tabs-panel>content 2</ksd-tabs-panel>
        </ksd-tabs>
      `,
      {
        imports: [Tabs, TabsList, TabsTab, TabsPanel],
        componentProperties: {
          onTabClicked,
        },
      },
    )

    fireEvent.click(screen.getByText('Tab 2'))
    expect(onTabClicked).toHaveBeenCalledWith({ index: 1, tabId: 'tab-2' })
  })

  it('should emit tabClicked from ksd-tabs-tab when a tab is clicked', async () => {
    const onTabClicked = vi.fn()

    await render(
      `
        <ksd-tabs>
          <ksd-tabs-list>
            <ksd-tabs-tab tabId="tab-1" (tabClicked)="onTabClicked($event)">Tab 1</ksd-tabs-tab>
            <ksd-tabs-tab>Tab 2</ksd-tabs-tab>
          </ksd-tabs-list>
          <ksd-tabs-panel>content 1</ksd-tabs-panel>
          <ksd-tabs-panel>content 2</ksd-tabs-panel>
        </ksd-tabs>
      `,
      {
        imports: [Tabs, TabsList, TabsTab, TabsPanel],
        componentProperties: {
          onTabClicked,
        },
      },
    )

    fireEvent.click(screen.getByText('Tab 1'))
    expect(onTabClicked).toHaveBeenCalledWith({ index: 0, tabId: 'tab-1' })
  })

  it('should emit undefined tabId when tabId is not provided', async () => {
    const onTabClicked = vi.fn()

    await render(
      `
        <ksd-tabs>
          <ksd-tabs-list>
            <ksd-tabs-tab (tabClicked)="onTabClicked($event)">Tab 1</ksd-tabs-tab>
          </ksd-tabs-list>
          <ksd-tabs-panel>content 1</ksd-tabs-panel>
        </ksd-tabs>
      `,
      {
        imports: [Tabs, TabsList, TabsTab, TabsPanel],
        componentProperties: {
          onTabClicked,
        },
      },
    )

    fireEvent.click(screen.getByText('Tab 1'))
    expect(onTabClicked).toHaveBeenCalledWith({ index: 0, tabId: undefined })
  })
})
