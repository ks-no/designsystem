import { renderExample } from '@internal/docs/render'
import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import * as examples from './summary-list.examples'

type Row = { term: string; detail: string }

type SummaryListArgs = {
  rows: Row[]
  /** An "Endre" link on each row */
  actions: boolean
}

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
  render: renderExample,
}

export default meta

type Story = StoryObj<SummaryListArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
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
  render: (a) =>
    html`<dl class="ksd-summary-list">
      ${a.rows.map(
        ({ term, detail }) =>
          html`<div>
            <dt>${term}</dt>
            <dd>${detail}</dd>
            ${
              a.actions
                ? html`<dd class="ksd-summary-list__actions">
                    <a class="ds-link" href="#"
                      >Endre<span class="ds-sr-only">
                        ${String(term).toLowerCase()}</span
                      ></a
                    >
                  </dd>`
                : nothing
            }
          </div>`,
      )}
    </dl>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

export const SmalKolonne: Story = {
  ...controls,
  name: 'Smal kolonne',
  parameters: { snippets: examples.preview },
  decorators: [
    (story) => html`<div style="max-inline-size: 20rem">${story()}</div>`,
  ],
}

export const ICard: Story = {
  name: 'I card',
  parameters: { snippets: examples.inCard },
}
