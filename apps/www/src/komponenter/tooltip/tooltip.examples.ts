import {
  component,
  per,
  raw,
  snippets,
  type Attrs,
  type Child,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type TooltipArgs = {
  content: string
  'data-placement'?: 'top' | 'bottom' | 'left' | 'right'
}

const registration = `import '@ks-digital/designsystem-web'`

export const imports: Imports = {
  html: registration,
  // Angular has no Tooltip component: use data-tooltip, like in HTML
  angular: `${registration}
import { Button } from '@ks-digital/designsystem-angular/button'`,
  react: `import { Button, Tooltip } from '@ks-digital/designsystem-react'`,
}

const Button = component({
  html: 'button.ds-button',
  angular: 'button[ksd-button]',
  react: 'Button',
  reactProps: { 'data-variant': 'variant', 'data-icon': 'icon' },
})
// Sets data-tooltip and data-placement on its child
const Tooltip = component({
  html: 'span',
  react: 'Tooltip',
  reactProps: { 'data-placement': 'placement' },
})

// React's Button sets type="button" itself
const type = per({ react: null, default: 'button' })

const copyIcon = raw(
  `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
  <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
</svg>`,
)

/**
 * HTML and Angular put data-tooltip on the element itself; React wraps it in Tooltip.
 * Without text, the tooltip becomes the element's name (aria-label); with text, it
 * becomes its description (aria-description).
 */
const withTooltip = (
  { content, 'data-placement': placement }: TooltipArgs,
  attrs: Attrs,
  ...children: Child[]
) => {
  const tooltip = per({ react: null, default: content })
  const button = Button(
    {
      type,
      ...attrs,
      'data-tooltip': tooltip,
      'data-placement': per({ react: null, default: placement }),
    },
    ...children,
  )
  return per({
    react: Tooltip({ content, 'data-placement': placement }, button),
    default: button,
  })
}

export const preview = (args: TooltipArgs) =>
  snippets(
    withTooltip(
      args,
      { 'data-variant': 'tertiary', 'data-icon': true },
      copyIcon,
    ),
  )

export const description = (args: TooltipArgs) =>
  snippets(
    withTooltip(
      { ...args, content: 'Utkastet lagres i 30 dager' },
      { 'data-variant': 'secondary' },
      'Lagre utkast',
    ),
  )
