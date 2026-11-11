import {
  component,
  el,
  per,
  snippets,
  type AttrValue,
  type PlainChild,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type ToggleGroupArgs = {
  'data-variant'?: 'primary' | 'secondary'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  react: `import { ToggleGroup } from '@ks-digital/designsystem-react'`,
}

// Angular has no ToggleGroup component: use the HTML
const ToggleGroup = component({
  html: 'fieldset.ds-toggle-group',
  react: 'ToggleGroup',
  reactProps: { 'data-variant': 'variant' },
})
// Each item is a radio button styled as a tertiary button
const Item = component({ html: 'label.ds-button', react: 'ToggleGroup.Item' })
const notReact = (value: AttrValue | PlainChild) =>
  per({ react: null, default: value })

type Option = { value: string; label: string }

const group = (
  name: string,
  label: string,
  options: Option[],
  attrs: ToggleGroupArgs,
) =>
  ToggleGroup(
    {
      'aria-label': label,
      focusgroup: notReact('radiogroup'),
      defaultValue: per({ react: options[0].value }),
      ...attrs,
    },
    ...options.map((option, index) =>
      Item(
        {
          'data-variant': notReact('tertiary'),
          value: per({ react: option.value }),
        },
        notReact(
          el('input', {
            type: 'radio',
            name,
            value: option.value,
            checked: index === 0,
          }),
        ),
        option.label,
      ),
    ),
  )

const views: Option[] = [
  { value: 'liste', label: 'Liste' },
  { value: 'kart', label: 'Kart' },
  { value: 'kalender', label: 'Kalender' },
]

export const preview = (args: ToggleGroupArgs) =>
  snippets(group('visning', 'Visning', views, args))

export const variants = (args: ToggleGroupArgs) => {
  const attrs = {
    'data-size': args['data-size'],
    'data-color': args['data-color'],
  }
  return snippets(
    group('visning-primary', 'Visning', views, {
      ...attrs,
      'data-variant': 'primary',
    }),
    group('visning-secondary', 'Visning', views, {
      ...attrs,
      'data-variant': 'secondary',
    }),
  )
}
