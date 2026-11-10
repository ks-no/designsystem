import { component, el, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type DropdownArgs = {
  'data-placement'?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `// Plasserer menyen ved knappen, én gang i applikasjonen
import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { Dropdown } from '@ks-digital/designsystem-angular/dropdown'
import { Heading } from '@ks-digital/designsystem-angular/heading'`,
  react: `import { Button, Dropdown } from '@ks-digital/designsystem-react'`,
}

const Button = component({
  html: 'button.ds-button',
  angular: 'button[ksd-button]',
  react: 'Button',
  reactProps: { 'data-variant': 'variant' },
})
// React's Dropdown renders only ds-dropdown; Angular's directive adds ds-popover too
const Dropdown = component({
  html: 'div.ds-dropdown',
  angular: 'div[ksd-dropdown]',
  react: 'Dropdown',
  reactProps: { 'data-placement': 'placement' },
})
const Heading = component({
  html: 'h2.ds-heading',
  angular: 'h2[ksd-heading]',
  react: 'Dropdown.Heading',
})
const List = component({ html: 'ul', react: 'Dropdown.List' })
const Item = component({ html: 'li', react: 'Dropdown.Item' })
// Dropdown.Button is a tertiary Button
const ItemButton = component({
  html: 'button.ds-button',
  angular: 'button[ksd-button]',
  react: 'Dropdown.Button',
})

// React's Button sets type="button" itself
const type = per({ html: 'button', angular: 'button' })
const tertiary = per({ html: 'tertiary', angular: 'tertiary' })
// Angular's directive sets popover="auto" and React's Dropdown handles opening itself
const popover = per({ html: true })

const item = (label: string) =>
  Item({}, ItemButton({ type, 'data-variant': tertiary }, label))

/** A link styled as a menu item: `asChild` in React */
const linkItem = (href: string, label: string) => {
  const link = (selector: string) =>
    el(selector, { 'data-variant': 'tertiary', href }, label)
  return Item(
    {},
    per({
      html: link('a.ds-button'),
      angular: link('a[ksd-button]'),
      react: ItemButton({ asChild: true }, el('a', { href }, label)),
    }),
  )
}

export const preview = (args: DropdownArgs) => {
  const id = 'dropdown-last-ned'
  return snippets(
    Button({ type, popovertarget: id }, 'Last ned vedtaket'),
    Dropdown(
      { id, popover, ...args },
      Heading({}, 'Velg format'),
      List({}, item('PDF'), item('Word')),
    ),
  )
}

export const withLinks = (args: DropdownArgs) => {
  const id = 'dropdown-bruker'
  return snippets(
    Button(
      { type, 'data-variant': 'tertiary', popovertarget: id },
      'Kari Nordmann',
    ),
    Dropdown(
      {
        id,
        popover,
        'data-placement': 'bottom-end',
        'data-size': args['data-size'],
        'data-color': args['data-color'],
      },
      List(
        {},
        linkItem('/profil', 'Min profil'),
        linkItem('/saker', 'Mine saker'),
        item('Logg ut'),
      ),
    ),
  )
}
