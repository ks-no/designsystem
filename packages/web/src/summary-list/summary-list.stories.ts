import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

type Row = { term: string; detail: string }

type SummaryListArgs = {
  rows: Row[]
  actions: boolean
}

// Whitespace inside these templates is what Storybook's "show code" panel prints, so it
// is kept out of Prettier's hands: each row starts on its own line and the optional cell
// hugs the preceding tag instead of leaving a blank line.
// prettier-ignore
const actionsCell = (term: string) => html`
    <dd class="ksd-summary-list__actions">
      <a class="ds-link" href="#">Endre<span class="ds-sr-only"> ${term.toLowerCase()}</span></a>
    </dd>`

// prettier-ignore
const row = ({ term, detail }: Row, actions: boolean) => html`
  <div>
    <dt>${term}</dt>
    <dd>${detail}</dd>${actions ? actionsCell(term) : ''}
  </div>`

// prettier-ignore
const summaryList = ({ rows, actions }: SummaryListArgs) => html`<dl class="ksd-summary-list">${rows.map((r) => row(r, actions))}
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
