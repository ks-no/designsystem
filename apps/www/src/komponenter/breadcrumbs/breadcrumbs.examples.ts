import { component, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type BreadcrumbsArgs = {
  'aria-label': string
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Breadcrumbs } from '@ks-digital/designsystem-angular/breadcrumbs'\nimport { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import { Breadcrumbs } from '@ks-digital/designsystem-react'`,
}

type Content = {
  /** The "back" link shown on narrow screens */
  back?: string
  /** The full trail, shown when there is room. `aria-current` is set on the last one automatically. */
  trail?: string[]
}

const Breadcrumbs = component({
  html: 'ds-breadcrumbs.ds-breadcrumbs',
  angular: 'ksd-breadcrumbs',
  react: 'Breadcrumbs',
})
const Link = component({
  html: 'a.ds-link',
  angular: 'a[ksd-link]',
  react: 'Breadcrumbs.Link',
})
const List = component({ html: 'ol', react: 'Breadcrumbs.List' })
const Item = component({ html: 'li', react: 'Breadcrumbs.Item' })

const example =
  ({ back, trail }: Content) =>
  (args: BreadcrumbsArgs) =>
    snippets(
      Breadcrumbs(
        args,
        back && Link({ href: '#', 'aria-label': `Tilbake til ${back}` }, back),
        trail &&
          List({}, ...trail.map((t) => Item({}, Link({ href: '#' }, t)))),
      ),
    )

const trail = ['Hjem', 'Tjenester', 'Søknader', 'Søknad om barnehageplass']

export const preview = example({ back: 'Søknader', trail })
export const listOnly = example({ trail })
export const backOnly = example({ back: 'Søknader' })
