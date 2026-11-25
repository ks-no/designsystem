import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './input.examples'

type InputArgs = {
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'password'
  'data-size'?: string
  label: string
  disabled?: boolean
  readonly?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'input',
  imports: examples.imports,
}

const meta: Meta<InputArgs> = {
  title: 'Komponenter/Input',
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
  decorators: [(story) => html`<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<InputArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'E-post', type: 'email', disabled: false, readonly: false },
  argTypes: {
    type: {
      options: ['text', 'email', 'tel', 'number', 'date', 'password'],
      control: { type: 'select' },
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (a) =>
    html`<ds-field class="ds-field" data-size=${ifDefined(a['data-size'])}>
      <label class="ds-label">${a.label}</label>
      <input
        class="ds-input"
        type=${a.type}
        ?disabled=${a.disabled}
        ?readonly=${a.readonly}
      />
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Bredde: Story = { parameters: { snippets: examples.width } }
export const MedTegnteller: Story = {
  name: 'Med tegnteller',
  parameters: { snippets: examples.withCounter },
}
