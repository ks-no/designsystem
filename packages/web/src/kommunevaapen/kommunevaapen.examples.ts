import { escapeAttr, type HtmlSnippets } from '@internal/storybook/snippets'

export type KommunevaapenArgs = {
  /** Kommunenummeret, f.eks. `1502` */
  kommunenummer: string
  /** Tom når bildet er pynt, f.eks. ved siden av kommunenavnet */
  alt: string
}

const BASE = 'https://static.fiks.ks.no/img/kommunevaapen'

// A plain image: the same markup in every framework
export const preview = ({
  kommunenummer,
  alt,
}: KommunevaapenArgs): HtmlSnippets => ({
  html: `<img alt="${escapeAttr(alt)}" src="${BASE}/${escapeAttr(kommunenummer)}.png" />`,
})
