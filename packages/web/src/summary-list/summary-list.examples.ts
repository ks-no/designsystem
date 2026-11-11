import { el, inline, snippets } from '@internal/storybook/markup'

export type Row = { term: string; detail: string }

export type SummaryListArgs = {
  rows: Row[]
  actions: boolean
}

// Pure CSS: the same markup in every framework (`class` becomes `className` in React)
const row = ({ term, detail }: Row, actions: boolean) =>
  el(
    'div',
    {},
    el('dt', {}, term),
    el('dd', {}, detail),
    actions &&
      el(
        'dd.ksd-summary-list__actions',
        {},
        el(
          'a.ds-link',
          { href: '#' },
          inline('Endre', el('span.ds-sr-only', {}, ` ${term.toLowerCase()}`)),
        ),
      ),
  )

const list = ({ rows, actions }: SummaryListArgs) =>
  el('dl.ksd-summary-list', {}, ...rows.map((r) => row(r, actions)))

export const preview = (args: SummaryListArgs) => snippets(list(args))

export const inCard = (args: SummaryListArgs) =>
  snippets(
    el(
      'article.ds-card',
      {},
      el(
        'h2.ds-heading.ds-card__block',
        { 'data-size': 'xs' },
        'Søknad om ledsagerbevis',
      ),
      el('div.ds-card__block', {}, list(args)),
    ),
  )
