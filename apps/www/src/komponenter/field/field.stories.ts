import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './field.examples'

type FieldArgs = {
  'data-size'?: string
  label: string
  description: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'field',
  imports: examples.imports,
}

const meta: Meta<FieldArgs> = {
  title: 'Komponenter/Field',
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

type Story = StoryObj<FieldArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    label: 'Etternavn',
    description: 'Slik det står i folkeregisteret.',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
  },
  render: (a) =>
    html`<ds-field class="ds-field" data-size=${ifDefined(a['data-size'])}>
      <label class="ds-label">${a.label}</label>
      ${
        a.description
          ? html`<div data-field="description">${a.description}</div>`
          : nothing
      }
      <input class="ds-input" type="text" />
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedFeilmelding: Story = {
  name: 'Med feilmelding',
  parameters: { snippets: examples.withError },
}
