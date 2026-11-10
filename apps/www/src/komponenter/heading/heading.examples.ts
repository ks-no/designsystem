import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export const headingSizes = [
  '2xl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
  '2xs',
] as const

type Level = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingArgs = {
  level: Level
  'data-size'?: (typeof headingSizes)[number]
  label: string
}

export const imports: Imports = {
  angular: `import { Heading } from '@ks-digital/designsystem-angular/heading'`,
  react: `import { Heading } from '@ks-digital/designsystem-react'`,
}

// The level decides the tag: h1–h6 in HTML and Angular, `level` in React
const Heading = (level: Level) =>
  component({
    html: `h${level}.ds-heading`,
    angular: `h${level}[ksd-heading]`,
    react: 'Heading',
  })

export const preview = ({ level, label, ...attrs }: HeadingArgs) =>
  snippets(Heading(level)({ level: per({ react: level }), ...attrs }, label))

export const sizes = () =>
  snippets(
    ...headingSizes.map((size) =>
      Heading(2)({ level: per({ react: 2 }), 'data-size': size }, size),
    ),
  )

// Level and size are independent: pick the level from the page structure
export const levelAndSize = () =>
  snippets(
    Heading(1)(
      { level: per({ react: 1 }), 'data-size': 'lg' },
      'Søknad om byggetillatelse',
    ),
    Heading(2)({ level: per({ react: 2 }), 'data-size': 'sm' }, 'Om tiltaket'),
  )
