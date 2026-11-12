import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './toggle-group.examples'

type ToggleGroupArgs = {
  'data-variant'?: 'primary' | 'secondary'
  'data-size'?: string
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'toggle-group',
  imports: examples.imports,
}

const meta: Meta<ToggleGroupArgs> = {
  title: 'Komponenter/Toggle Group',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
  decorators: [
    (story) =>
      html`<div
        style="display:flex;flex-direction:column;align-items:center;gap:var(--ds-size-4)"
      >
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<ToggleGroupArgs>

const views = [
  { value: 'liste', label: 'Liste' },
  { value: 'kart', label: 'Kart' },
  { value: 'kalender', label: 'Kalender' },
]

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  argTypes: {
    'data-variant': {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
  // Each item is a radio button styled as a tertiary button
  render: (a) =>
    html`<fieldset
      class="ds-toggle-group"
      aria-label="Visning"
      focusgroup="radiogroup"
      data-variant=${ifDefined(a['data-variant'])}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      ${views.map(
        (view, index) =>
          html`<label class="ds-button" data-variant="tertiary">
            <input
              type="radio"
              name="visning"
              value=${view.value}
              ?checked=${index === 0}
            />
            ${view.label}
          </label>`,
      )}
    </fieldset>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Varianter: Story = { parameters: { snippets: examples.variants } }
