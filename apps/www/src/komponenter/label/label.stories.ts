import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './label.examples'

type LabelArgs = {
  'data-size'?: string
  label: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'label',
  imports: examples.imports,
}

const meta: Meta<LabelArgs> = {
  title: 'Komponenter/Label',
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
  decorators: [(story) => html`<div style="max-width:22rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<LabelArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Fullt navn' },
  argTypes: {
    label: { control: 'text' },
  },
  render: (a) =>
    html`<ds-field class="ds-field">
      <label
        class="ds-label"
        for="fullt-navn"
        data-size=${ifDefined(a['data-size'])}
      >
        ${a.label}
      </label>
      <input class="ds-input" id="fullt-navn" type="text" />
    </ds-field>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
