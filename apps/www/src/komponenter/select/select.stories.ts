import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './select.examples'

type SelectArgs = {
  'data-size'?: string
  label: string
  disabled?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'select',
  imports: examples.imports,
}

const meta: Meta<SelectArgs> = {
  title: 'Komponenter/Select',
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

type Story = StoryObj<SelectArgs>

const municipalities = [
  ['4601', 'Bergen'],
  ['0301', 'Oslo'],
  ['1103', 'Stavanger'],
  ['5001', 'Trondheim'],
]

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Kommune', disabled: false },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (a) =>
    html`<ds-field class="ds-field" data-size=${ifDefined(a['data-size'])}>
      <label class="ds-label">${a.label}</label>
      <select class="ds-input" ?disabled=${a.disabled}>
        <option value="">Velg kommune</option>
        ${municipalities.map(
          ([value, name]) => html`<option value=${value}>${name}</option>`,
        )}
      </select>
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedGrupper: Story = {
  name: 'Med grupper',
  parameters: { snippets: examples.groups },
}
