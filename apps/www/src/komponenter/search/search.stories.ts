import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './search.examples'

type SearchArgs = {
  'data-size'?: string
  'data-color'?: string
  /** Accessible name of the input, when there is no visible label */
  label: string
  buttonLabel: string
  variant: 'primary' | 'secondary'
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'search',
  imports: examples.imports,
}

const meta: Meta<SearchArgs> = {
  title: 'Komponenter/Search',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<SearchArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'Søk', buttonLabel: 'Søk', variant: 'primary' },
  argTypes: {
    label: { control: 'text' },
    buttonLabel: { control: 'text' },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
  render: (a) =>
    html`<ds-suggestion
      class="ds-search"
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      <input class="ds-input" type="text" aria-label=${a.label} />
      <button type="reset"></button>
      <button class="ds-button" type="submit" data-variant=${a.variant}>
        ${a.buttonLabel}
      </button>
    </ds-suggestion>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedIkon: Story = {
  name: 'Med ikon',
  parameters: { snippets: examples.withIcon },
}
export const MedLabel: Story = {
  name: 'Med label',
  parameters: { snippets: examples.withLabel },
}
export const ISkjema: Story = {
  name: 'I skjema',
  parameters: { snippets: examples.inForm },
  decorators: [
    // Submitting would leave the docs page; the code shown is unchanged
    (story) =>
      html`<div @submit=${(event: SubmitEvent) => event.preventDefault()}>
        ${story()}
      </div>`,
  ],
}
