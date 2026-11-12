import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './checkbox.examples'

type CheckboxArgs = {
  'data-size'?: string
  'data-variant'?: 'outline'
  'data-position'?: 'start' | 'end'
  label: string
  description: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'checkbox',
  imports: examples.imports,
}

const meta: Meta<CheckboxArgs> = {
  title: 'Komponenter/Checkbox',
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

type Story = StoryObj<CheckboxArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    label: 'Jeg bekrefter at opplysningene er riktige',
    description: 'Du kan endre søknaden fram til fristen.',
    checked: false,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    'data-variant': { options: ['outline'], control: { type: 'radio' } },
    'data-position': { options: ['start', 'end'], control: { type: 'radio' } },
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
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
        value="bekreftet"
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
export const MedFeilmelding: Story = {
  name: 'Med feilmelding',
  parameters: { snippets: examples.withError },
}
