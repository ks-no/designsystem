import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { themeColors } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './avatar.examples'

const avatarSizes = ['xs', 'sm', 'md', 'lg'] as const

type AvatarArgs = {
  'data-size'?: (typeof avatarSizes)[number]
  'data-color'?: string
  'aria-label': string
  /** Empty: the avatar shows a person icon */
  initials: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'avatar',
  imports: examples.imports,
}

const meta: Meta<AvatarArgs> = {
  title: 'Komponenter/Avatar',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: {
    'data-size': {
      options: [...avatarSizes],
      control: { type: 'radio' },
    },
    'data-color': {
      options: [...themeColors],
      control: { type: 'radio' },
    },
  },
  render: renderExample,
  decorators: [
    (story) =>
      html`<div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--ds-size-4)"
      >
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<AvatarArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { 'aria-label': 'Kari Nordmann', initials: 'KN' },
  argTypes: {
    'aria-label': { control: 'text' },
    initials: { control: 'text' },
  },
  // No whitespace inside the span: without initials it must be empty to show the icon
  render: (a) =>
    html`<span
      class="ds-avatar"
      role="img"
      aria-label=${a['aria-label']}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
      >${a.initials || nothing}</span
    >`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const Storrelser: Story = {
  name: 'Størrelser',
  parameters: { snippets: examples.sizes },
}
export const UtenInitialer: Story = {
  ...controls,
  name: 'Uten initialer',
  args: { ...controls.args, initials: '' },
  parameters: { snippets: examples.noInitials },
}
