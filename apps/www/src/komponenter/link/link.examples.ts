import {
  attrs,
  props,
  text,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

export type LinkArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  href: string
  label: string
}

export const imports: Imports = {
  angular: `import { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import { Link } from '@ks-digital/designsystem-react'`,
}

export const preview = ({ label, href, ...a }: LinkArgs): Snippets => ({
  html: `<a class="ds-link" href="${href}"${attrs(a)}>${text(label)}</a>`,
  angular: `<a ksd-link href="${href}"${attrs(a)}>${text(label)}</a>`,
  react: `<Link href="${href}"${props(a)}>${text(label)}</Link>`,
})

export const inText = (args: LinkArgs): Snippets => {
  const link = preview(args)
  return {
    html: `<p class="ds-paragraph">\n  Les mer om ${link.html}.\n</p>`,
    angular: `<p ksd-paragraph>\n  Les mer om ${link.angular}.\n</p>`,
    react: `<Paragraph>\n  Les mer om ${link.react}.\n</Paragraph>`,
  }
}
