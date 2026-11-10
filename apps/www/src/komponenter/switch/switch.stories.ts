import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { SwitchArgs } from './switch.examples'
import * as examples from './switch.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'switch',
  imports: examples.imports,
}

const meta: Meta<SwitchArgs> = {
  title: 'Komponenter/Switch',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    label: 'Varsle meg på SMS',
    description: 'Vi sender SMS når det skjer noe i saken din.',
    checked: false,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    'data-variant': { options: ['outline'], control: { type: 'radio' } },
    'data-position': { options: ['start', 'end'], control: { type: 'radio' } },
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<SwitchArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Gruppe: Story = { parameters: { snippets: examples.inGroup } }
export const BryterenTilHoyre: Story = {
  name: 'Bryteren til høyre',
  parameters: { snippets: examples.end },
}
