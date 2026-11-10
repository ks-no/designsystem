import { component, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type ListArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
}

// No Angular component: Angular uses the HTML
export const imports: Imports = {
  react: `import { List } from '@ks-digital/designsystem-react'`,
}

const Unordered = component({ html: 'ul.ds-list', react: 'List.Unordered' })
const Ordered = component({ html: 'ol.ds-list', react: 'List.Ordered' })
const Item = component({ html: 'li', react: 'List.Item' })

export const preview = (args: ListArgs) =>
  snippets(
    Unordered(
      args,
      Item({}, 'Situasjonskart'),
      Item({}, 'Tegninger av tiltaket'),
      Item({}, 'Nabovarsel'),
    ),
  )

export const ordered = (args: ListArgs) =>
  snippets(
    Ordered(
      args,
      Item({}, 'Fyll ut søknaden'),
      Item({}, 'Last opp vedlegg'),
      Item({}, 'Send inn og få kvittering på e-post'),
    ),
  )
