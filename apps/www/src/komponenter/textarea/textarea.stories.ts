import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './textarea.examples'

type TextareaArgs = {
  'data-size'?: string
  label: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'textarea',
  imports: examples.imports,
}

const meta: Meta<TextareaArgs> = {
  title: 'Komponenter/Textarea',
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

type Story = StoryObj<TextareaArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Begrunnelse', disabled: false, readonly: false },
  argTypes: {
    label: { control: 'text' },
    rows: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (a) =>
    html`<ds-field class="ds-field" data-size=${ifDefined(a['data-size'])}>
      <label class="ds-label">${a.label}</label>
      <textarea
        class="ds-input"
        rows=${ifDefined(a.rows)}
        ?disabled=${a.disabled}
        ?readonly=${a.readonly}
      ></textarea>
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedTegnteller: Story = {
  name: 'Med tegnteller',
  parameters: { snippets: examples.withCounter },
}
