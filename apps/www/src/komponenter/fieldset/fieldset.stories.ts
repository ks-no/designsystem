import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { renderExample } from '../../../.storybook/render'
import * as examples from './fieldset.examples'

type FieldsetArgs = {
  legend: string
  description: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'fieldset',
  imports: examples.imports,
}

const meta: Meta<FieldsetArgs> = {
  title: 'Komponenter/Fieldset',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  render: renderExample,
  decorators: [(story) => html`<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<FieldsetArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    legend: 'Adresse',
    description: 'Adressen der du bor nå.',
  },
  argTypes: {
    legend: { control: 'text' },
    description: { control: 'text' },
  },
  render: (a) =>
    html`<fieldset class="ds-fieldset">
      <legend class="ds-label">${a.legend}</legend>
      ${
        a.description
          ? html`<p class="ds-paragraph">${a.description}</p>`
          : nothing
      }
      <ds-field class="ds-field">
        <label class="ds-label">Gateadresse</label>
        <input class="ds-input" type="text" autocomplete="street-address" />
      </ds-field>
      <ds-field class="ds-field">
        <label class="ds-label">Postnummer</label>
        <input
          class="ds-input"
          type="text"
          size="4"
          inputmode="numeric"
          autocomplete="postal-code"
        />
      </ds-field>
      <ds-field class="ds-field">
        <label class="ds-label">Poststed</label>
        <input class="ds-input" type="text" autocomplete="address-level2" />
      </ds-field>
    </fieldset>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
