import {
  component,
  el,
  per,
  snippets,
  type Attrs,
  type Child,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type CardArgs = {
  variant?: 'default' | 'tinted'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Card, CardBlock } from '@ks-digital/designsystem-angular/card'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Card, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
}

// The input is `variant` in Angular and React, the attribute `data-variant` in HTML
const Card = component({
  html: 'div.ds-card',
  angular: 'div[ksd-card]',
  react: 'Card',
  angularProps: { 'data-variant': 'variant' },
  reactProps: { 'data-variant': 'variant' },
})
const CardBlock = component({
  html: 'div.ds-card__block',
  angular: 'div[ksd-card-block]',
  react: 'Card.Block',
})
const Heading = component({
  html: 'h2.ds-heading',
  angular: 'h2[ksd-heading]',
  react: 'Heading',
})
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

const cardAttrs = ({ variant, ...rest }: CardArgs): Attrs => ({
  'data-variant': variant,
  ...rest,
})

const heading = (child: Child) =>
  Heading({ level: per({ react: 2 }), 'data-size': 'xs' }, child)

export const preview = (args: CardArgs) =>
  snippets(
    Card(
      cardAttrs(args),
      heading('Søknad om barnehageplass'),
      Paragraph(
        {},
        'Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.',
      ),
    ),
  )

// Angular and React set data-clickdelegatefor and the link id themselves
export const withLink = (args: CardArgs) =>
  snippets(
    Card(
      {
        ...cardAttrs(args),
        'data-clickdelegatefor': per({ html: 'barnehage-lenke' }),
      },
      heading(
        el(
          'a',
          { id: per({ html: 'barnehage-lenke' }), href: '#barnehage' },
          'Søk om barnehageplass',
        ),
      ),
      Paragraph({}, 'Hele kortet er klikkbart når overskriften har en lenke.'),
    ),
  )

export const withBlocks = (args: CardArgs) =>
  snippets(
    Card(
      cardAttrs(args),
      CardBlock({}, heading('Byggesak 2025/1234')),
      CardBlock(
        {},
        Paragraph(
          {},
          'Søknaden er mottatt og venter på behandling. Saksbehandlingstiden er normalt tre uker.',
        ),
      ),
      CardBlock(
        {},
        Paragraph({ 'data-size': 'sm' }, 'Sist oppdatert 12. mars'),
      ),
    ),
  )
