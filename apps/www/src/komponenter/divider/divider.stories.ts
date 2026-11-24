import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { renderExample } from '../../../.storybook/render'
import * as examples from './divider.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'divider',
  imports: examples.imports,
}

const meta: Meta = {
  title: 'Komponenter/Divider',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  render: renderExample,
  decorators: [(story) => html`<div style="max-width:32rem">${story()}</div>`],
}
export default meta

type Story = StoryObj

export const Preview: Story = { parameters: { snippets: examples.preview } }
