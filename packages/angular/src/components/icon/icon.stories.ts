import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { Icon } from '../icon/icon'

const meta: Meta<Icon> = {
  component: Icon,
  title: 'Komponenter/Ikon',
  decorators: [
    moduleMetadata({
      imports: [Icon],
    }),
  ],
}
export default meta
type Story = StoryObj<Icon>

export const Preview: Story = {
  args: {
    size: '40px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ksd-icon size="40px" />
    `,
  }),
}
