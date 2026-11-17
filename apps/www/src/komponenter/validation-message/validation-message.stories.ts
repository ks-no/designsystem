import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './validation-message.examples'

type ValidationMessageArgs = {
  'data-color'?: 'danger' | 'success' | 'warning' | 'info'
  'data-size'?: string
  text: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'validation-message',
  imports: examples.imports,
}

const meta: Meta<ValidationMessageArgs> = {
  title: 'Komponenter/Validation Message',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: {
    'data-color': {
      options: ['danger', 'success', 'warning', 'info'],
      control: { type: 'radio' },
    },
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  render: renderExample,
  decorators: [(story) => html`<div style="max-width:24rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<ValidationMessageArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { text: 'Fyll inn saksnummer.' },
  argTypes: {
    text: { control: 'text' },
  },
  render: (a) =>
    html`<p
      class="ds-validation-message"
      data-field="validation"
      data-color=${ifDefined(a['data-color'])}
      data-size=${ifDefined(a['data-size'])}
    >
      ${a.text}
    </p>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const IEtFelt: Story = {
  name: 'I et felt',
  parameters: { snippets: examples.inField },
}
