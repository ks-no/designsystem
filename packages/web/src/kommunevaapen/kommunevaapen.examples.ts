import { EMPTY, el, htmlSnippets } from '@internal/storybook/markup'

export type KommunevaapenArgs = {
  /** Kommunenummeret, f.eks. `1502` */
  kommunenummer: string
  /** Tom når bildet er pynt, f.eks. ved siden av kommunenavnet */
  alt: string
}

const BASE = 'https://static.fiks.ks.no/img/kommunevaapen'

// A plain image: the same markup in every framework
export const preview = ({ kommunenummer, alt }: KommunevaapenArgs) =>
  htmlSnippets(
    el('img', { alt: alt || EMPTY, src: `${BASE}/${kommunenummer}.png` }),
  )
