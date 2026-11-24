import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './switch.examples'

type SwitchArgs = {
  'data-size'?: string
  'data-variant'?: 'outline'
  'data-position'?: 'start' | 'end'
  label: string
  description: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
  /** Not a Control: differs between the examples */
  name: string
}

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
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  render: renderExample,
}
export default meta

type Story = StoryObj<SwitchArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    label: 'Varsle meg på SMS',
    description: 'Vi sender SMS når det skjer noe i saken din.',
    checked: false,
    disabled: false,
    readonly: false,
    name: 'varsel-sms',
  },
  argTypes: {
    'data-variant': { options: ['outline'], control: { type: 'radio' } },
    'data-position': { options: ['start', 'end'], control: { type: 'radio' } },
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    name: { table: { disable: true } },
  },
  render: (a) =>
    html`<ds-field
      class="ds-field"
      data-size=${ifDefined(a['data-size'])}
      data-variant=${ifDefined(a['data-variant'])}
      data-position=${ifDefined(a['data-position'])}
    >
      <input
        class="ds-input"
        type="checkbox"
        role="switch"
        name=${a.name}
        ?checked=${a.checked}
        ?disabled=${a.disabled}
        ?readonly=${a.readonly}
      />
      <label class="ds-label">${a.label}</label>
      ${
        a.description
          ? html`<div data-field="description">${a.description}</div>`
          : nothing
      }
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Gruppe: Story = { parameters: { snippets: examples.inGroup } }
export const BryterenTilHoyre: Story = {
  ...controls,
  name: 'Bryteren til høyre',
  args: {
    ...controls.args,
    label: 'Vis bare mine saker',
    description: '',
    'data-position': 'end',
    name: 'mine-saker',
  },
  parameters: { snippets: examples.end },
}
