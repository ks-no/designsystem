import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './dropdown.examples'

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'right',
] as const

type DropdownArgs = {
  'data-placement'?: (typeof placements)[number]
  'data-size'?: string
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'dropdown',
  imports: examples.imports,
}

const meta: Meta<DropdownArgs> = {
  title: 'Komponenter/Dropdown',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<DropdownArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { 'data-placement': 'bottom-end' },
  argTypes: {
    'data-placement': {
      options: [...placements],
      control: { type: 'select' },
    },
  },
  render: (a) =>
    html`<button
        class="ds-button"
        type="button"
        popovertarget="dropdown-last-ned"
      >
        Last ned vedtaket
      </button>
      <div
        class="ds-dropdown"
        id="dropdown-last-ned"
        popover
        data-placement=${ifDefined(a['data-placement'])}
        data-size=${ifDefined(a['data-size'])}
        data-color=${ifDefined(a['data-color'])}
      >
        <h2 class="ds-heading">Velg format</h2>
        <ul>
          <li>
            <button class="ds-button" type="button" data-variant="tertiary">
              PDF
            </button>
          </li>
          <li>
            <button class="ds-button" type="button" data-variant="tertiary">
              Word
            </button>
          </li>
        </ul>
      </div>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedLenker: Story = {
  name: 'Med lenker',
  parameters: { snippets: examples.withLinks },
}
