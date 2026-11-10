import { snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  angularFormsImport,
  group,
  htmlImports,
  reactImport,
  toggle,
} from '../field/form-parts'

export type SwitchArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-variant'?: 'outline'
  'data-position'?: 'start' | 'end'
  label: string
  description: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport(
    'Field',
    'FieldDescription',
    'Fieldset',
    'FieldsetLegend',
    'Input',
    'Label',
  ),
  react: reactImport('Fieldset', 'Switch'),
}

export const preview = (args: SwitchArgs) =>
  snippets(toggle('switch', { ...args, name: 'varsel-sms' }))

const notifications = [
  ['sms', 'SMS', true],
  ['epost', 'E-post', false],
  ['digital-postkasse', 'Digital postkasse', false],
] as const

export const inGroup = (args: SwitchArgs) =>
  snippets(
    group(
      { legend: 'Varsle meg når saken er oppdatert' },
      ...notifications.map(([value, label, checked]) =>
        toggle('switch', {
          label,
          name: 'varsel',
          value,
          checked,
          'data-size': args['data-size'],
        }),
      ),
    ),
  )

export const end = (args: SwitchArgs) =>
  snippets(
    toggle('switch', {
      label: 'Vis bare mine saker',
      name: 'mine-saker',
      'data-position': 'end',
      'data-size': args['data-size'],
    }),
  )
