import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Tag } from '@ks-digital/designsystem-angular/tag'`,
  react: `import { Tag } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<span class="ds-tag" data-variant="default">Ny</span>`,
  angular: `<ksd-tag data-variant="default">Ny</ksd-tag>`,
  react: `<Tag variant="default">Ny</Tag>`,
}

export const variants: Snippets = {
  html: `<span class="ds-tag" data-variant="default">Default</span>
<span class="ds-tag" data-variant="outline">Outline</span>`,
  angular: `<ksd-tag data-variant="default">Default</ksd-tag>
<ksd-tag data-variant="outline">Outline</ksd-tag>`,
  react: `<>
  <Tag variant="default">Default</Tag>
  <Tag variant="outline">Outline</Tag>
</>`,
}
