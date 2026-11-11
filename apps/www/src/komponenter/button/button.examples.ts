import { component, per, raw, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type ButtonArgs = {
  'data-variant'?: 'primary' | 'secondary' | 'tertiary'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  loading?: boolean
  disabled?: boolean
  label: string
}

export const imports: Imports = {
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'`,
  react: `import { Button } from '@ks-digital/designsystem-react'`,
}

// The markup Digdir's React Spinner and our Angular Spinner render
const spinner = `<svg class="ds-spinner" role="img" viewBox="0 0 50 50" aria-hidden="true">
  <circle class="ds-spinner__background" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  <circle class="ds-spinner__circle" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
</svg>`

const heartIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
  <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path>
</svg>`

type One = Omit<ButtonArgs, 'label'> & { label: string; icon?: boolean }

const Button = component({
  html: 'button.ds-button',
  angular: 'button[ksd-button]',
  react: 'Button',
  reactProps: { 'data-variant': 'variant', 'data-icon': 'icon' },
})

const icon = per({
  html: raw(heartIcon),
  angular: raw('<ng-icon name="phosphorHeart" aria-hidden="true" />'),
  react: raw('<Heart aria-hidden />'),
})

// In HTML you add the spinner and aria-busy yourself; Angular and React do it with `loading`
const button = (a: One) =>
  Button(
    {
      type: per({ html: 'button' }),
      'data-variant': a['data-variant'],
      'data-size': a['data-size'],
      'data-color': a['data-color'],
      'data-icon': a.icon,
      'aria-label': a.icon ? a.label : undefined,
      'aria-busy': per({ html: a.loading ? 'true' : undefined }),
      loading: per({ html: null, default: a.loading }),
      disabled: a.disabled,
    },
    per({ html: a.loading ? raw(spinner) : null }),
    a.icon ? per({ html: a.loading ? null : icon, default: icon }) : a.label,
  )

export const preview = (args: ButtonArgs) => snippets(button(args))

export const variants = (args: ButtonArgs) =>
  snippets(
    ...(['primary', 'secondary', 'tertiary'] as const).map((variant) =>
      button({
        ...args,
        'data-variant': variant,
        label: variant[0].toUpperCase() + variant.slice(1),
      }),
    ),
  )

export const icons = (args: ButtonArgs) =>
  snippets(button({ ...args, icon: true, label: 'Legg til i favoritter' }))

export const loading = (args: ButtonArgs) =>
  snippets(button({ ...args, loading: true, label: 'Lagrer…' }))
