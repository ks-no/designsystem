import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './badge.examples'

type BadgeArgs = {
  count?: number
  maxCount?: number
  'data-variant'?: 'base' | 'tinted'
  'data-size'?: string
  'data-color'?: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'badge',
  imports: examples.imports,
}

const meta: Meta<BadgeArgs> = {
  title: 'Komponenter/Badge',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<BadgeArgs>

/** What the badge shows: like React's Badge, "99+" above maxCount */
const shownCount = ({ count, maxCount }: BadgeArgs) =>
  count != null && maxCount != null && count > maxCount
    ? `${maxCount}+`
    : count?.toString()

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { count: 5, maxCount: 99, 'data-variant': 'base' },
  argTypes: {
    count: { control: { type: 'number', min: 0 } },
    maxCount: { control: { type: 'number', min: 1 } },
    'data-variant': {
      options: ['base', 'tinted'],
      control: { type: 'radio' },
    },
  },
  render: (a) =>
    html`<span
      class="ds-badge"
      data-count=${ifDefined(shownCount(a))}
      data-variant=${ifDefined(a['data-variant'])}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    ></span>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Plassering: Story = {
  parameters: { snippets: examples.placement },
}
