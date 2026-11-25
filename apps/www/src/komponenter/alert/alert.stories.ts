import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './alert.examples'

type AlertArgs = {
  'data-color'?: 'info' | 'success' | 'warning' | 'danger'
  'data-size'?: string
  /** Empty: the alert has only text, without a heading */
  heading: string
  body: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'alert',
  imports: examples.imports,
}

const meta: Meta<AlertArgs> = {
  title: 'Komponenter/Alert',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: {
    'data-color': {
      options: ['info', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  render: renderExample,
}
export default meta

type Story = StoryObj<AlertArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    'data-color': 'info',
    heading: 'Søknadsfristen er 1. mars',
    body: 'Søknader som kommer inn etter fristen, blir ikke behandlet.',
  },
  argTypes: {
    heading: { control: 'text' },
    body: { control: 'text' },
  },
  render: (a) =>
    html`<div
      class="ds-alert"
      data-color=${ifDefined(a['data-color'])}
      data-size=${ifDefined(a['data-size'])}
    >
      ${
        a.heading
          ? html`<h2 class="ds-heading" data-size="xs">${a.heading}</h2>
              <p class="ds-paragraph">${a.body}</p>`
          : a.body
      }
    </div>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const BareTekst: Story = {
  ...controls,
  name: 'Bare tekst',
  args: { ...controls.args, heading: '' },
  parameters: { snippets: examples.textOnly },
}
