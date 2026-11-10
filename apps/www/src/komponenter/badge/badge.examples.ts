import { component, per, raw, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type BadgeArgs = {
  count?: number
  maxCount?: number
  'data-variant'?: 'base' | 'tinted'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

// No Angular component: Angular uses the HTML
export const imports: Imports = {
  react: `import { Badge } from '@ks-digital/designsystem-react'`,
}

const Badge = component({
  html: 'span.ds-badge',
  react: 'Badge',
  reactProps: { 'data-variant': 'variant' },
})
const BadgePosition = component({
  html: 'span.ds-badge--position',
  react: 'Badge.Position',
  reactProps: { 'data-placement': 'placement', 'data-overlap': 'overlap' },
})

// Phosphor "Envelope". The text for screen readers is on the icon: the badge is only visual.
const envelope = raw(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" role="img" aria-label="Innboks, 3 uleste meldinger">
  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
</svg>`,
)

// React computes data-count from count and maxCount, e.g. "99+"
const badge = ({ count, maxCount, ...attrs }: BadgeArgs) => {
  const shown =
    count != null && maxCount != null && count > maxCount
      ? `${maxCount}+`
      : count
  return Badge({
    'data-count': per({ html: shown, angular: shown }),
    count: per({ react: count }),
    maxCount: per({ react: maxCount }),
    ...attrs,
  })
}

export const preview = (args: BadgeArgs) => snippets(badge(args))

export const placement = () =>
  snippets(
    BadgePosition(
      { 'data-placement': 'top-right' },
      badge({ count: 3, 'data-color': 'danger' }),
      envelope,
    ),
  )
