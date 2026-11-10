import { el, htmlSnippets, type Node } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type CopyButtonArgs = {
  value: string
  text: string
  variant: 'primary' | 'secondary' | 'tertiary'
  copyLabel: string
  copiedLabel: string
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
}

// A native button with data attributes: the same markup in every framework
const button = ({
  value,
  text,
  variant,
  copyLabel,
  copiedLabel,
}: CopyButtonArgs): Node =>
  el(
    'button.ds-button',
    {
      type: 'button',
      'data-variant': variant,
      // Without text the button is square, with the label as its accessible name
      'data-icon': !text,
      'data-copy': value,
      'data-copy-label': copyLabel,
      'data-copied-label': copiedLabel,
    },
    text,
  )

export const preview = (args: CopyButtonArgs) =>
  htmlSnippets(
    el(
      'p.ds-paragraph',
      { style: 'display:flex;align-items:center;gap:var(--ds-size-2)' },
      'Saksnummer',
      el('strong', {}, args.value),
      button(args),
    ),
  )

export const single = (args: CopyButtonArgs) => htmlSnippets(button(args))
