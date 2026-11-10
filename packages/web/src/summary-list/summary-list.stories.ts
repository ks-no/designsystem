import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { SummaryListArgs } from './summary-list.examples'
import * as examples from './summary-list.examples'

const ksd: KsdDocsParameters = {
  origin: 'ks',
  // The component is CSS only, so link to the stylesheet
  source: 'packages/themes/src/ksd/summary-list.css',
}

const meta: Meta<SummaryListArgs> = {
  title: 'Summary List',
  parameters: {
    ksd,
    // Global layout is 'centered', which shrink-wraps the list to its content width
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    rows: [
      { term: 'Navn', detail: 'Sarah Philips' },
      { term: 'Fødselsnummer', detail: '12345678901' },
      { term: 'Adresse', detail: 'Storgata 1, 0155 Oslo' },
      { term: 'Saksnummer', detail: '2026/01482-7' },
    ],
    actions: false,
  },
  argTypes: {
    rows: { control: 'object' },
    actions: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}

export default meta

type Story = StoryObj<SummaryListArgs>

export const Preview: Story = {
  parameters: { snippets: examples.preview },
}

export const SmalKolonne: Story = {
  name: 'Smal kolonne',
  parameters: { snippets: examples.preview },
  decorators: [
    (story) => `<div style="max-inline-size: 20rem">${story()}</div>`,
  ],
}

export const ICard: Story = {
  name: 'I card',
  args: { actions: true },
  parameters: { snippets: examples.inCard },
}
