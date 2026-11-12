import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './popover.examples'

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const

type PopoverArgs = {
  'data-variant'?: 'default' | 'tinted'
  'data-placement'?: (typeof placements)[number]
  'data-size'?: string
  'data-color'?: string
  content: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'popover',
  imports: examples.imports,
}

const meta: Meta<PopoverArgs> = {
  title: 'Komponenter/Popover',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<PopoverArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    content: 'Saksnummeret står øverst i brevet du fikk fra kommunen.',
    'data-placement': 'top',
  },
  argTypes: {
    'data-variant': {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
    'data-placement': {
      options: [...placements],
      control: { type: 'select' },
    },
    content: { control: 'text' },
  },
  render: (a) =>
    html`<button
        class="ds-button"
        type="button"
        data-variant="secondary"
        popovertarget="popover-saksnummer"
      >
        Hvor finner jeg saksnummeret?
      </button>
      <div
        class="ds-popover"
        id="popover-saksnummer"
        popover
        data-variant=${ifDefined(a['data-variant'])}
        data-placement=${ifDefined(a['data-placement'])}
        data-size=${ifDefined(a['data-size'])}
        data-color=${ifDefined(a['data-color'])}
      >
        ${a.content}
      </div>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedHandlinger: Story = {
  name: 'Med handlinger',
  parameters: { snippets: examples.withActions },
}
