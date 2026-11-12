import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  react: `import { Avatar } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<span class="ds-avatar" role="img" aria-label="Kari Nordmann">KN</span>`,
  angular: `<span class="ds-avatar" role="img" aria-label="Kari Nordmann">KN</span>`,
  react: `<Avatar aria-label="Kari Nordmann">KN</Avatar>`,
}

export const sizes: Snippets = {
  html: `<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="xs">
  KN
</span>
<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="sm">
  KN
</span>
<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="md">
  KN
</span>
<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="lg">
  KN
</span>`,
  angular: `<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="xs">
  KN
</span>
<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="sm">
  KN
</span>
<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="md">
  KN
</span>
<span class="ds-avatar" role="img" aria-label="Kari Nordmann" data-size="lg">
  KN
</span>`,
  react: `<>
  <Avatar aria-label="Kari Nordmann" data-size="xs">KN</Avatar>
  <Avatar aria-label="Kari Nordmann" data-size="sm">KN</Avatar>
  <Avatar aria-label="Kari Nordmann" data-size="md">KN</Avatar>
  <Avatar aria-label="Kari Nordmann" data-size="lg">KN</Avatar>
</>`,
}

export const noInitials: Snippets = {
  html: `<span class="ds-avatar" role="img" aria-label="Kari Nordmann"></span>`,
  angular: `<span class="ds-avatar" role="img" aria-label="Kari Nordmann"></span>`,
  react: `<Avatar aria-label="Kari Nordmann" />`,
}
