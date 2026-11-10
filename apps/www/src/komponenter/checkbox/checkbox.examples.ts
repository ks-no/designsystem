import { snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  angularFormsImport,
  group,
  htmlImports,
  reactImport,
  toggle,
} from '../field/form-parts'

export type CheckboxArgs = {
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
    'FieldError',
    'Fieldset',
    'FieldsetDescription',
    'FieldsetLegend',
    'Input',
    'Label',
  ),
  react: reactImport('Checkbox', 'Fieldset', 'ValidationMessage'),
}

export const preview = (args: CheckboxArgs) =>
  snippets(toggle('checkbox', { ...args, value: 'bekreftet' }))

const contact = [
  ['epost', 'E-post'],
  ['sms', 'SMS'],
  ['brev', 'Brev'],
]

const contactGroup = (args: CheckboxArgs, error?: string) =>
  group(
    {
      legend: 'Hvordan vil du at vi skal kontakte deg?',
      description: 'Velg alle som passer.',
      error,
    },
    ...contact.map(([value, label]) =>
      toggle('checkbox', {
        label,
        name: 'kontakt',
        value,
        invalid: !!error,
        'data-size': args['data-size'],
        'data-variant': args['data-variant'],
      }),
    ),
  )

export const inGroup = (args: CheckboxArgs) => snippets(contactGroup(args))

export const withError = (args: CheckboxArgs) =>
  snippets(contactGroup(args, 'Velg minst én måte vi kan kontakte deg på.'))
