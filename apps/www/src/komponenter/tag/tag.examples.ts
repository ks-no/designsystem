import { component, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type TagArgs = {
  'data-variant'?: 'default' | 'outline'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  label: string
}

export const imports: Imports = {
  angular: `import { Tag } from '@ks-digital/designsystem-angular/tag'`,
  react: `import { Tag } from '@ks-digital/designsystem-react'`,
}

const Tag = component({
  html: 'span.ds-tag',
  angular: 'ksd-tag',
  react: 'Tag',
  reactProps: { 'data-variant': 'variant' },
})

export const preview = ({ label, ...attrs }: TagArgs) =>
  snippets(Tag(attrs, label))

export const variants = (args: TagArgs) => {
  const attrs = {
    'data-size': args['data-size'],
    'data-color': args['data-color'],
  }
  return snippets(
    Tag({ 'data-variant': 'default', ...attrs }, 'Default'),
    Tag({ 'data-variant': 'outline', ...attrs }, 'Outline'),
  )
}
