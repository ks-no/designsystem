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
    'Vi har endret padding fra standardverdien `--ds-size-6` til `--ds-size-8`.',
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
}
export default meta

type Story = StoryObj<CardArgs>

const maxWidth =
  (width: string): Story['decorators'] =>
  (story) =>
    html`<div style="max-width:${width}">${story()}</div>`

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
  decorators: maxWidth('22rem'),
  parameters: { snippets: examples.preview },
}
export const MedLenke: Story = {
  name: 'Med lenke',
  decorators: maxWidth('22rem'),
  parameters: { snippets: examples.withLink },
}
export const MedBlokker: Story = {
  name: 'Med blokker',
  decorators: maxWidth('22rem'),
  parameters: { snippets: examples.withBlocks },
}
/** Bilde ved siden av innholdet. Innholdet brytes under bildet når det er lite plass. */
export const Horisontal: Story = {
  decorators: maxWidth('40rem'),
  parameters: { snippets: examples.horizontal },
}
export const ListeMedKort: Story = {
  name: 'Liste med kort',
  decorators: maxWidth('40rem'),
  parameters: { snippets: examples.list },
}
/** Hele kortet er klikkbart og krysser av i avkrysningsboksen. */
export const MedAvkrysningsboks: Story = {
  name: 'Med avkrysningsboks',
  decorators: maxWidth('22rem'),
  parameters: { snippets: examples.withCheckbox },
}
