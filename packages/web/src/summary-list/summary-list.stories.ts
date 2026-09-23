import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

type Row = { term: string; detail: string }

type SummaryListArgs = {
  rows: Row[]
  actions: boolean
}

const summaryList = ({ rows, actions }: SummaryListArgs) =>
  html`<dl class="ksd-summary-list">
    ${rows.map(
      (row) =>
        html`<div>
          <dt>${row.term}</dt>
          <dd>${row.detail}</dd>
          ${actions
            ? html`<dd class="ksd-summary-list__actions">
                <a class="ds-link" href="#"
                  >Endre<span class="ds-sr-only">
                    ${row.term.toLowerCase()}</span
                  ></a
                >
              </dd>`
            : null}
        </div>`,
    )}
  </dl>`

const meta: Meta<SummaryListArgs> = {
  title: 'Summary List',
  // Global layout is 'centered', which shrink-wraps the list to its content width
  parameters: { layout: 'padded' },
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
}

export default meta

type Story = StoryObj<SummaryListArgs>

export const Preview: Story = {
  render: summaryList,
}

export const SmalKolonne: Story = {
  name: 'Smal kolonne',
  render: (args) =>
    html`<div style="max-inline-size: 20rem">${summaryList(args)}</div>`,
}

export const ICard: Story = {
  name: 'I card',
  args: { actions: true },
  render: (args) =>
    html`<article class="ds-card">
      <h2 class="ds-heading ds-card__block" data-size="xs">
        Søknad om ledsagerbevis
      </h2>
      <div class="ds-card__block">${summaryList(args)}</div>
    </article>`,
}
