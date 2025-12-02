import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsPanel, TabsTab } from '.'

const user = userEvent.setup()

describe('Tabs', () => {
  it('can navigate tabs with keyboard', async () => {
    await render(
      `
      <ksd-tabs>
        <ksd-tabs-list>
          <button ksd-tabs-tab value='value1'>Tab 1</button>
          <button ksd-tabs-tab value='value2'>Tab 2</button>
        </ksd-tabs-list>
        <ksd-tabs-panel value='value1'>content 1</ksd-tabs-panel>
        <ksd-tabs-panel value='value2'>content 2</ksd-tabs-panel>
      </ksd-tabs> `,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    await user.tab()
    expect(tab1).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(tab2).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(tab1).toHaveFocus()
    await user.keyboard('{ArrowUp}')
    expect(tab2).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(tab1).toHaveFocus()
    await user.keyboard('{Space}')
    expect(tab1).toHaveAttribute('aria-selected')
    await user.keyboard('{ArrowRight}')
    expect(tab2).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(tab2).toHaveAttribute('aria-selected')
  })

  it('renders content based on value', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-list>
          <button ksd-tabs-tab value='value1'>Tab 1</button>
          <button ksd-tabs-tab value='value2'>Tab 2</button>
        </ksd-tabs-list>
        <ksd-tabs-panel value='value1'>content 1</ksd-tabs-panel>
        <ksd-tabs-panel value='value2'>content 2</ksd-tabs-panel>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    expect(screen.queryByText('content 1')).toBeVisible()
    expect(screen.queryByText('content 2')).toHaveAttribute('hidden', '')
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.queryByText('content 2')).toBeVisible()
    expect(screen.queryByText('content 1')).toHaveAttribute('hidden', '')
  })

  it('item renders with correct aria attributes', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-list>
          <button ksd-tabs-tab value='value1'>Tab 1</button>
          <button ksd-tabs-tab value='value2'>Tab 2</button>
        </ksd-tabs-list>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const tab = screen.getByRole('tab', { name: 'Tab 2' })
    expect(tab).toHaveAttribute('aria-selected', 'false')
    await user.click(tab)
    expect(tab).toHaveAttribute('aria-selected', 'true')
  })

  it('renders NgContent as children when TabsPanels value is selected', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-panel value='value1'>
          <div>content 1</div>
        </ksd-tabs-panel>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const content = screen.queryByText('content 1')
    expect(content).toBeInTheDocument()
  })

  it('has tabindex 0 on tabpanel', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-panel value='value1'>content 1</ksd-tabs-panel>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAttribute('tabindex', '0')
  })

  it('has no tabindex when tabpanel has focusable element', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-panel value='value1'>
          <input type='text' />
        </ksd-tabs-panel>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const panel = screen.getByRole('tabpanel')
    expect(panel).not.toHaveAttribute('tabindex', '0')
  })

  it('panel is aria-labelledby button', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-list>
          <button ksd-tabs-tab value='value1' id='custom-id'>
            Tab 1
          </button>
          <button ksd-tabs-tab value='value2' data-testid='button'>
            Tab 2
          </button>
        </ksd-tabs-list>
        <ksd-tabs-panel value='value1' data-testid='panel-1'>
          content 1
        </ksd-tabs-panel>
        <ksd-tabs-panel value='value2' data-testid='panel-2'>
          content 2
        </ksd-tabs-panel>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const testButton = screen.getByRole('tab', { name: 'Tab 2' })

    const panelOne = screen.getByTestId('panel-1')
    expect(panelOne).toHaveAttribute('aria-labelledby', 'custom-id')

    const panelTwo = screen.getByTestId('panel-2')
    expect(panelTwo).toHaveAttribute('aria-labelledby', testButton.id)
  })

  it('button has aria-controls for panel', async () => {
    await render(
      `
      <ksd-tabs defaultValue='value1'>
        <ksd-tabs-list>
          <button ksd-tabs-tab value='value1' data-testid='button-1'>
            Tab 1
          </button>
          <button ksd-tabs-tab value='value2' data-testid='button-2'>
            Tab 2
          </button>
        </ksd-tabs-list>
        <ksd-tabs-panel value='value1' data-testid='panel'>
          content 1
        </ksd-tabs-panel>
        <ksd-tabs-panel value='value2' id='panel2'>
          content 2
        </ksd-tabs-panel>
      </ksd-tabs>`,
      { imports: [Tabs, TabsList, TabsTab, TabsPanel] },
    )

    const buttonOne = screen.getByTestId('button-1')
    const buttonTwo = screen.getByTestId('button-2')
    const panel = screen.getByTestId('panel')
    expect(buttonOne).toHaveAttribute('aria-controls', panel.id)
    expect(buttonTwo).toHaveAttribute('aria-controls', 'panel2')
  })
})
