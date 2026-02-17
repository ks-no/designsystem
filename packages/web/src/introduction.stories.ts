import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

export const Welcome: Story = {
  render: () => html`
    <div style="max-width: 600px; font-family: system-ui, sans-serif;">
      <h1>Web Components</h1>
    </div>
  `,
}
