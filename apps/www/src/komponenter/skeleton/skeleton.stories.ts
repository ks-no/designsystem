import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { renderExample } from '../../../.storybook/render'
import * as examples from './skeleton.examples'

type SkeletonArgs = {
  'data-variant': 'rectangle' | 'circle' | 'text'
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'skeleton',
  imports: examples.imports,
}

const meta: Meta<SkeletonArgs> = {
  title: 'Komponenter/Skeleton',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  render: renderExample,
  decorators: [
    (story) =>
      html`<div
        style="display:flex;flex-direction:column;gap:var(--ds-size-3);max-width:24rem"
      >
        ${story()}
      </div>`,
  ],
}
export default meta

type Story = StoryObj<SkeletonArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { 'data-variant': 'rectangle' },
  argTypes: {
    'data-variant': {
      options: ['rectangle', 'circle', 'text'],
      control: { type: 'radio' },
    },
  },
  render: (a) => {
    if (a['data-variant'] === 'circle')
      return html`<span
        class="ds-skeleton"
        data-variant="circle"
        style="width: 48px; height: 48px"
        aria-hidden="true"
      ></span>`
    // Text inside a text skeleton sets its width, and is hidden
    if (a['data-variant'] === 'text')
      return html`<span
        class="ds-skeleton"
        data-variant="text"
        aria-hidden="true"
      >
        Søknad om barnehageplass
      </span>`
    return html`<span
      class="ds-skeleton"
      data-variant="rectangle"
      style="width: 240px; height: 120px"
      aria-hidden="true"
    ></span>`
  },
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const LasterInnhold: Story = {
  name: 'Laster innhold',
  parameters: { snippets: examples.loading },
}
