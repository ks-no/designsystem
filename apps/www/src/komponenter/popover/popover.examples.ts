import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type PopoverArgs = {
  'data-variant'?: 'default' | 'tinted'
  'data-placement'?: Placement
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  content: string
}

export const imports: Imports = {
  html: `// Plasserer popoveren ved knappen, én gang i applikasjonen
import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import { Popover } from '@ks-digital/designsystem-angular/popover'`,
  react: `import { Button, Paragraph, Popover } from '@ks-digital/designsystem-react'`,
}

const Button = component({
  html: 'button.ds-button',
  angular: 'button[ksd-button]',
  react: 'Button',
  reactProps: { 'data-variant': 'variant' },
})
const Popover = component({
  html: 'div.ds-popover',
  angular: 'div[ksd-popover]',
  react: 'Popover',
  reactProps: { 'data-variant': 'variant', 'data-placement': 'placement' },
})
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

// React's Button sets type="button" itself
const type = per({ html: 'button', angular: 'button' })
// Angular's directive sets popover="auto" and React's Popover handles opening itself
const popover = per({ html: true })

export const preview = ({ content, ...attrs }: PopoverArgs) => {
  const id = 'popover-saksnummer'
  return snippets(
    Button(
      { type, 'data-variant': 'secondary', popovertarget: id },
      'Hvor finner jeg saksnummeret?',
    ),
    Popover({ id, popover, ...attrs }, content),
  )
}

export const withActions = (args: PopoverArgs) => {
  const id = 'popover-slett'
  const attrs = {
    'data-size': args['data-size'],
    'data-variant': args['data-variant'],
  }
  // popovertargetaction="hide" closes the popover without JavaScript
  const close = { popovertarget: id, popovertargetaction: 'hide' }
  return snippets(
    Button(
      {
        type,
        'data-variant': 'secondary',
        'data-color': 'danger',
        popovertarget: id,
      },
      'Slett vedlegg',
    ),
    Popover(
      {
        id,
        popover,
        'data-color': 'danger',
        'data-placement': 'bottom',
        ...attrs,
      },
      Paragraph({}, 'Vil du slette vedlegget? Du kan ikke angre.'),
      Button(
        { type, 'data-color': 'danger', 'data-size': 'sm', ...close },
        'Ja, slett',
      ),
      Button(
        { type, 'data-variant': 'tertiary', 'data-size': 'sm', ...close },
        'Avbryt',
      ),
    ),
  )
}
