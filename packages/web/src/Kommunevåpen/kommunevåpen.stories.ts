import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  component: 'kommunevaapen',
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  args: {},
  render: () => {
    return `<img alt="" src="https://static.fiks.ks.no/img/kommunevaapen/1502.png" />`
  },
}
