import {
  attrs,
  indent,
  props,
  text,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

export type BreadcrumbsArgs = {
  'aria-label': string
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `// Registrerer <ds-breadcrumbs>, én gang i applikasjonen\nimport '@ks-digital/designsystem-web'`,
  angular: `import { Breadcrumbs } from '@ks-digital/designsystem-angular/breadcrumbs'\nimport { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import { Breadcrumbs } from '@ks-digital/designsystem-react'`,
}

type Content = {
  /** The "back" link shown on narrow screens */
  back?: string
  /** The full trail, shown when there is room. `aria-current` is set on the last one automatically. */
  trail?: string[]
}

function html(args: BreadcrumbsArgs, { back, trail }: Content): string {
  const children = [
    back &&
      `<a class="ds-link" href="#" aria-label="Tilbake til ${text(back)}">${text(back)}</a>`,
    trail &&
      `<ol>\n${indent(trail.map((t) => `<li><a class="ds-link" href="#">${text(t)}</a></li>`).join('\n'))}\n</ol>`,
  ].filter(Boolean)
  return `<ds-breadcrumbs class="ds-breadcrumbs"${attrs(args)}>\n${indent(children.join('\n'))}\n</ds-breadcrumbs>`
}

function angular(args: BreadcrumbsArgs, { back, trail }: Content): string {
  const children = [
    back &&
      `<a ksd-link href="#" aria-label="Tilbake til ${text(back)}">${text(back)}</a>`,
    trail &&
      `<ol>\n${indent(trail.map((t) => `<li><a ksd-link href="#">${text(t)}</a></li>`).join('\n'))}\n</ol>`,
  ].filter(Boolean)
  return `<ksd-breadcrumbs${attrs(args)}>\n${indent(children.join('\n'))}\n</ksd-breadcrumbs>`
}

function react(args: BreadcrumbsArgs, { back, trail }: Content): string {
  const item = (t: string) =>
    `<Breadcrumbs.Item>\n  <Breadcrumbs.Link href="#">${text(t)}</Breadcrumbs.Link>\n</Breadcrumbs.Item>`
  const children = [
    back &&
      `<Breadcrumbs.Link href="#" aria-label="Tilbake til ${text(back)}">\n  ${text(back)}\n</Breadcrumbs.Link>`,
    trail &&
      `<Breadcrumbs.List>\n${indent(trail.map(item).join('\n'))}\n</Breadcrumbs.List>`,
  ].filter(Boolean)
  return `<Breadcrumbs${props(args)}>\n${indent(children.join('\n'))}\n</Breadcrumbs>`
}

const example =
  (content: Content) =>
  (args: BreadcrumbsArgs): Snippets => ({
    html: html(args, content),
    angular: angular(args, content),
    react: react(args, content),
  })

const trail = ['Hjem', 'Tjenester', 'Søknader', 'Søknad om barnehageplass']

export const preview = example({ back: 'Søknader', trail })
export const listOnly = example({ trail })
export const backOnly = example({ back: 'Søknader' })
