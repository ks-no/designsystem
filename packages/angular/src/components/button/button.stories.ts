import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { Button } from './button'

const meta: Meta<Button> = {
  component: Button,
  title: 'Button',
  decorators: [
    moduleMetadata({
      imports: [Button],
    }),
  ],
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--ds-size-4)',
    },
  },
}
export default meta
type Story = StoryObj<Button>

export const Preview: Story = {
  args: {
    // disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
      <button ksd-button>Knapp</button>
    `,
  }),
}

export const Variants: Story = {
  args: {
    ...Preview.args,
  },

  render: (args) => ({
    props: args,
    template: `
    <button ksd-button variant="primary">Primary</button>
    <button ksd-button variant="secondary">Secondary</button>
    <button ksd-button variant="tertiary">Teritiary</button>
    `,
  }),
}
