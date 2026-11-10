import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { themeColors } from '../../../.storybook/args'
import type { AvatarArgs } from './avatar.examples'
import * as examples from './avatar.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'avatar',
  imports: examples.imports,
}

const meta: Meta<AvatarArgs> = {
  title: 'Komponenter/Avatar',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  args: { 'aria-label': 'Kari Nordmann', initials: 'KN' },
  argTypes: {
    'data-size': {
      options: [...examples.avatarSizes],
      control: { type: 'radio' },
    },
    'data-color': {
      options: [...themeColors],
      control: { type: 'radio' },
    },
    'aria-label': { control: 'text' },
    initials: { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
  decorators: [
    (story) =>
      `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--ds-size-4)">${story()}</div>`,
  ],
}
export default meta

type Story = StoryObj<AvatarArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Storrelser: Story = {
  name: 'Størrelser',
  parameters: { snippets: examples.sizes },
}
export const UtenInitialer: Story = {
  name: 'Uten initialer',
  parameters: { snippets: examples.noInitials },
}
