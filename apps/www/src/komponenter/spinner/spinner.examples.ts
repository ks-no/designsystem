import { component, el, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export const spinnerSizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const

export type SpinnerArgs = {
  'data-size'?: (typeof spinnerSizes)[number]
  'data-color'?: string
  'aria-label': string
}

export const imports: Imports = {
  angular: `import { Spinner } from '@ks-digital/designsystem-angular/spinner'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Paragraph, Spinner } from '@ks-digital/designsystem-react'`,
}

const Spinner = component({
  html: 'svg.ds-spinner',
  angular: 'ksd-spinner',
  react: 'Spinner',
})
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

const circle = (className: string) =>
  el(`circle.${className}`, {
    cx: 25,
    cy: 25,
    r: 20,
    fill: 'none',
    'stroke-width': 5,
  })

// Angular and React render the SVG themselves
const spinner = (attrs: Partial<SpinnerArgs> & { 'aria-hidden'?: 'true' }) =>
  Spinner(
    {
      role: per({ html: 'img' }),
      viewBox: per({ html: '0 0 50 50' }),
      ...attrs,
    },
    per({ html: circle('ds-spinner__background') }),
    per({ html: circle('ds-spinner__circle') }),
  )

export const preview = (args: SpinnerArgs) => snippets(spinner(args))

export const sizes = (args: SpinnerArgs) =>
  snippets(
    ...spinnerSizes.map((size) => spinner({ ...args, 'data-size': size })),
  )

// With visible text, hide the spinner from screen readers
export const withText = ({ 'data-color': color }: SpinnerArgs) =>
  snippets(
    spinner({ 'data-size': 'sm', 'data-color': color, 'aria-hidden': 'true' }),
    Paragraph({}, 'Henter søknadene dine …'),
  )
