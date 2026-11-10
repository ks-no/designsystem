import { component, el, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type SkipLinkArgs = {
  label: string
}

export const imports: Imports = {
  react: `import { SkipLink } from '@ks-digital/designsystem-react'`,
}

// Angular has no SkipLink component: use the HTML
const SkipLink = component({ html: 'a.ds-skip-link', react: 'SkipLink' })

export const preview = ({ label }: SkipLinkArgs) => {
  const id = 'hovedinnhold'
  return snippets(
    // First on the page, so it's the first thing Tab reaches
    SkipLink({ href: `#${id}` }, label),
    el('main', { id, tabindex: -1 }, 'Hovedinnholdet på siden'),
  )
}
