import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './card.examples'

type CardArgs = {
  /** The `data-variant` attribute in HTML, `variant` in Angular and React */
  variant?: 'default' | 'tinted'
  'data-size'?: string
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'card',
  changes: [
    'Vi har endret padding fra default `--ds-size-6` til `--ds-size-8`',
  ],
  source: 'packages/angular/card/src',
  imports: examples.imports,
}

const meta: Meta<CardArgs> = {
  title: 'Komponenter/Card',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
  render: renderExample,
  decorators: [(story) => html`<div style="max-width:22rem">${story()}</div>`],
}
export default meta

type Story = StoryObj<CardArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { variant: 'default' },
  argTypes: {
    variant: {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
  },
  render: (a) =>
    html`<div
      class="ds-card"
      data-variant=${ifDefined(a.variant)}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      <h2 class="ds-heading" data-size="xs">Søknad om barnehageplass</h2>
      <p class="ds-paragraph">
        Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av
        april.
      </p>
    </div>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedLenke: Story = {
  name: 'Med lenke',
  parameters: { snippets: examples.withLink },
}
export const MedBlokker: Story = {
  name: 'Med blokker',
  parameters: { snippets: examples.withBlocks },
}
