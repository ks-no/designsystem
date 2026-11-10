import {
  attrs,
  indent,
  props,
  text,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

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

function html(a: One): string {
  const open = `<button type="button" class="ds-button"${attrs({
    'data-variant': a['data-variant'],
    'data-size': a['data-size'],
    'data-color': a['data-color'],
    'data-icon': a.icon,
    'aria-label': a.icon ? a.label : undefined,
    'aria-busy': a.loading ? 'true' : undefined,
    disabled: a.disabled,
  })}>`
  const children = [
    a.loading ? spinner : '',
    a.icon ? (a.loading ? '' : heartIcon) : text(a.label),
  ].filter(Boolean)
  return `${open}\n${indent(children.join('\n'))}\n</button>`
}

function angular(a: One): string {
  const open = `<button ksd-button${attrs({
    'data-variant': a['data-variant'],
    'data-size': a['data-size'],
    'data-color': a['data-color'],
    'data-icon': a.icon,
    'aria-label': a.icon ? a.label : undefined,
    loading: a.loading,
    disabled: a.disabled,
  })}>`
  const child = a.icon
    ? '<ng-icon name="phosphorHeart" aria-hidden="true" />'
    : text(a.label)
  return `${open}\n  ${child}\n</button>`
}

function react(a: One): string {
  const open = `<Button${props({
    variant: a['data-variant'],
    'data-size': a['data-size'],
    'data-color': a['data-color'],
    icon: a.icon,
    'aria-label': a.icon ? a.label : undefined,
    loading: a.loading,
    disabled: a.disabled,
  })}>`
  const child = a.icon ? '<Heart aria-hidden />' : text(a.label)
  return `${open}\n  ${child}\n</Button>`
}

const one = (a: One): Snippets => ({
  html: html(a),
  angular: angular(a),
  react: react(a),
})

const many = (buttons: One[]): Snippets => ({
  html: buttons.map(html).join('\n'),
  angular: buttons.map(angular).join('\n'),
  react: `<>\n${indent(buttons.map(react).join('\n'))}\n</>`,
})

export const preview = (args: ButtonArgs): Snippets => one(args)

export const variants = (args: ButtonArgs): Snippets =>
  many(
    (['primary', 'secondary', 'tertiary'] as const).map((variant) => ({
      ...args,
      'data-variant': variant,
      label: variant[0].toUpperCase() + variant.slice(1),
    })),
  )

export const icons = (args: ButtonArgs): Snippets =>
  many([{ ...args, icon: true, label: 'Legg til i favoritter' }])

export const loading = (args: ButtonArgs): Snippets =>
  one({ ...args, loading: true, label: 'Lagrer…' })
