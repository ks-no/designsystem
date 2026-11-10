import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export const avatarSizes = ['xs', 'sm', 'md', 'lg'] as const

export type AvatarArgs = {
  'data-size'?: (typeof avatarSizes)[number]
  'data-color'?: string
  'aria-label': string
  initials: string
}

// No Angular component: Angular uses the HTML
export const imports: Imports = {
  react: `import { Avatar } from '@ks-digital/designsystem-react'`,
}

const Avatar = component({ html: 'span.ds-avatar', react: 'Avatar' })

// React sets role="img" itself
const role = { role: per({ html: 'img', angular: 'img' }) }

export const preview = ({ initials, ...attrs }: AvatarArgs) =>
  snippets(Avatar({ ...role, ...attrs }, initials))

export const sizes = ({ initials, ...attrs }: AvatarArgs) =>
  snippets(
    ...avatarSizes.map((size) =>
      Avatar({ ...role, ...attrs, 'data-size': size }, initials),
    ),
  )

// Without content the avatar shows a person icon
export const noInitials = ({ 'aria-label': label, ...attrs }: AvatarArgs) =>
  snippets(
    Avatar({
      ...role,
      'data-size': attrs['data-size'],
      'data-color': attrs['data-color'],
      'aria-label': label,
    }),
  )
