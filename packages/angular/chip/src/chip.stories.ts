import { Input } from '@ks-digital/designsystem-angular/forms'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Chip } from './chip'

type ChipArgs = CommonArgs

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
    <div style="padding: 1rem; display: flex; gap: var(--ds-size-2);"> 
        <label ksd-chip ${argsToTemplate(args)}>
            <input ksd-input type="radio" name="language" value="nynorsk" checked/>
            Nynorsk
        </label>
        <label ksd-chip ${argsToTemplate(args)}>
            <input ksd-input type="radio" name="language" value="bokmaal" />
            Bokmål
        </label>
    </div>
    `,
  }),
}

export const Checkbox: Story = {
  render: (args) => ({
    props: args,
    template: `
        <label ksd-chip ${argsToTemplate(args)}>
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
        <label ksd-chip data-removable="true" aria-label="Fjern 2 kg sukker" ${argsToTemplate(args)}>
            2 kg sukker
        </label>
    `,
  }),
}

export const Button: Story = {
  render: (args) => ({
    props: args,
    template: `
        <button ksd-chip ${argsToTemplate(args)}>
            Tøm alle filtre
        </button>
    `,
  }),
}
