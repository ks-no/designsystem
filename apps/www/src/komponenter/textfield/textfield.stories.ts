import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './textfield.examples'

type TextfieldArgs = {
  'data-size'?: string
  label: string
  description: string
  error: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'textfield',
  imports: examples.imports,
}

const meta: Meta<TextfieldArgs> = {
  title: 'Komponenter/Textfield',
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

type Story = StoryObj<TextfieldArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    label: 'Saksnummer',
    description: 'Står øverst i brevet du fikk fra kommunen.',
    error: '',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
  render: (a) =>
    html`<ds-field class="ds-field" data-size=${ifDefined(a['data-size'])}>
      <label class="ds-label">${a.label}</label>
      ${
        a.description
          ? html`<div data-field="description">${a.description}</div>`
          : nothing
      }
      <input
        class="ds-input"
        type="text"
        aria-invalid=${ifDefined(a.error ? 'true' : undefined)}
      />
      ${
        a.error
          ? html`<p class="ds-validation-message" data-field="validation">
              ${a.error}
            </p>`
          : nothing
      }
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const FlereLinjer: Story = {
  name: 'Flere linjer',
  parameters: { snippets: examples.multiline },
}
