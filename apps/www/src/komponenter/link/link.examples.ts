import { component, inline, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type LinkArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  href: string
  label: string
}

export const imports: Imports = {
  angular: `import { Link } from '@ks-digital/designsystem-angular/link'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Link, Paragraph } from '@ks-digital/designsystem-react'`,
}

const Link = component({
  html: 'a.ds-link',
  angular: 'a[ksd-link]',
  react: 'Link',
})
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

export const preview = ({ label, href, ...attrs }: LinkArgs) =>
  snippets(Link({ href, ...attrs }, label))

export const inText = ({ label, href, ...attrs }: LinkArgs) =>
  snippets(
    Paragraph({}, inline('Les mer om ', Link({ href, ...attrs }, label), '.')),
  )
