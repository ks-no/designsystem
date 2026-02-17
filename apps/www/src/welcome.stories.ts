import type { Meta, StoryObj } from '@storybook/html'

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

export const Introduction: Story = {
  render: () => {
    const container = document.createElement('div')
    container.style.maxWidth = '600px'
    container.style.fontFamily = 'system-ui, sans-serif'
    container.innerHTML = `
      <h1>Composite storybook</h1>
      <ul>
        <li><strong>Angular</strong> - Angular components</li>
        <li><strong>Web Components</strong> - Framework-agnostic web components</li>
      </ul>
    `
    return container
  },
}
