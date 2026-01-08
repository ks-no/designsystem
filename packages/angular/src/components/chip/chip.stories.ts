import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Input } from '../input/input'
import { Chip } from './chip'

type ChipArgs = CommonArgs & {
  variant: 'default' | 'tinted'
}

const meta: Meta<ChipArgs> = {
  component: Chip,
  title: 'Komponenter/Chip',
  argTypes: {
    ...commonArgTypes,
  },
  decorators: [
    moduleMetadata({
      imports: [Chip, Input],
    }),
  ],
}
export default meta
type Story = StoryObj<ChipArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
        <label ksd-chip>
            <input ksd-input type="radio" />
            My radio chip
        </label>
    `,
  }),
}

export const Checkbox: Story = {
  render: (args) => ({
    props: args,
    template: `
        <label ksd-chip>
            <input ksd-input type="checkbox" />
            My checkbox chip
        </label>
    `,
  }),
}

export const Removable: Story = {
  render: (args) => ({
    props: args,
    template: `
        <label ksd-chip data-removable="true" aria-label="Fjern 2 kg sukker" >
            2 kg sukker
        </label>
    `,
  }),
}

export const Button: Story = {
  render: (args) => ({
    props: args,
    template: `
        <button ksd-chip>
            Tøm alle filtre
        </button>
    `,
  }),
}
