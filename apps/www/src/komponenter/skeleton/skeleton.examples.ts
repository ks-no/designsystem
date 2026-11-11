import {
  component,
  per,
  snippets,
  type Attrs,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type SkeletonArgs = {
  'data-variant'?: 'rectangle' | 'circle' | 'text'
}

export const imports: Imports = {
  angular: `import { Skeleton } from '@ks-digital/designsystem-angular/skeleton'`,
  react: `import { Skeleton } from '@ks-digital/designsystem-react'`,
}

const Skeleton = component({
  html: 'span.ds-skeleton',
  angular: 'ksd-skeleton',
  react: 'Skeleton',
  reactProps: { 'data-variant': 'variant' },
})

// Angular and React set aria-hidden themselves
const hidden = { 'aria-hidden': per({ html: 'true' }) }

// React has width and height props; elsewhere it's inline style
const size = (width: number, height: number): Attrs => ({
  style: per({
    react: null,
    default: { width: `${width}px`, height: `${height}px` },
  }),
  width: per({ react: width }),
  height: per({ react: height }),
})

const rectangle = () =>
  Skeleton({ 'data-variant': 'rectangle', ...size(240, 120), ...hidden })
const circle = () =>
  Skeleton({ 'data-variant': 'circle', ...size(48, 48), ...hidden })
// Text inside a text skeleton sets its width, and is hidden
const textLine = (label: string) =>
  Skeleton({ 'data-variant': 'text', ...hidden }, label)

export const preview = ({ 'data-variant': variant }: SkeletonArgs) => {
  if (variant === 'circle') return snippets(circle())
  if (variant === 'text') return snippets(textLine('Søknad om barnehageplass'))
  return snippets(rectangle())
}

export const loading = () =>
  snippets(
    circle(),
    textLine('Søknad om barnehageplass'),
    textLine(
      'Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.',
    ),
    rectangle(),
  )
