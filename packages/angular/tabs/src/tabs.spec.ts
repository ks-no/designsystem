import { render } from '@testing-library/angular'
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
})
