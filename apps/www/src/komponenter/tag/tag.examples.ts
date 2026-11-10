import {
  attrs,
  props,
  text,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

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

const one = ({ label, ...a }: TagArgs) => ({
  html: `<span class="ds-tag"${attrs(a)}>${text(label)}</span>`,
  angular: `<ksd-tag${attrs(a)}>${text(label)}</ksd-tag>`,
  react: `<Tag${props({
    variant: a['data-variant'],
    'data-size': a['data-size'],
    'data-color': a['data-color'],
  })}>${text(label)}</Tag>`,
})

const many = (tags: TagArgs[]): Snippets => ({
  html: tags.map((t) => one(t).html).join('\n'),
  angular: tags.map((t) => one(t).angular).join('\n'),
  react: `<>\n${tags.map((t) => `  ${one(t).react}`).join('\n')}\n</>`,
})

export const preview = (args: TagArgs): Snippets => one(args)

export const variants = (args: TagArgs): Snippets =>
  many([
    { ...args, 'data-variant': 'default', label: 'Default' },
    { ...args, 'data-variant': 'outline', label: 'Outline' },
  ])
