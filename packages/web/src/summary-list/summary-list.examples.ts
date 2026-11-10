import { indent, text, type Snippets } from '@internal/storybook/snippets'

export type Row = { term: string; detail: string }

export type SummaryListArgs = {
  rows: Row[]
  actions: boolean
}

// Pure CSS: the markup is the same in every framework, only `class`/`className` differs
type Attr = 'class' | 'className'

const actionsCell = (term: string, cls: Attr) =>
  `<dd ${cls}="ksd-summary-list__actions">\n  <a ${cls}="ds-link" href="#">Endre<span ${cls}="ds-sr-only"> ${text(term.toLowerCase())}</span></a>\n</dd>`

const row = ({ term, detail }: Row, actions: boolean, cls: Attr) =>
  [
    '<div>',
    `  <dt>${text(term)}</dt>`,
    `  <dd>${text(detail)}</dd>`,
    actions ? indent(actionsCell(term, cls)) : '',
    '</div>',
  ]
    .filter(Boolean)
    .join('\n')

const list = ({ rows, actions }: SummaryListArgs, cls: Attr) =>
  `<dl ${cls}="ksd-summary-list">\n${indent(rows.map((r) => row(r, actions, cls)).join('\n'))}\n</dl>`

const card = (args: SummaryListArgs, cls: Attr) =>
  `<article ${cls}="ds-card">\n  <h2 ${cls}="ds-heading ds-card__block" data-size="xs">Søknad om ledsagerbevis</h2>\n  <div ${cls}="ds-card__block">\n${indent(list(args, cls), 4)}\n  </div>\n</article>`

const example =
  (markup: (args: SummaryListArgs, cls: Attr) => string) =>
  (args: SummaryListArgs): Snippets => ({
    html: markup(args, 'class'),
    angular: markup(args, 'class'),
    react: markup(args, 'className'),
  })

export const preview = example(list)
export const inCard = example(card)
