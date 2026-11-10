import { snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  angularFormsImport,
  htmlImports,
  reactImport,
  textField,
} from './form-parts'

export type FieldArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  label: string
  description: string
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport(
    'Field',
    'FieldDescription',
    'FieldError',
    'Input',
    'Label',
  ),
  react: reactImport('Field', 'Input', 'Label', 'ValidationMessage'),
}

export const preview = ({ label, description, ...field }: FieldArgs) =>
  snippets(textField({ label, description, field }))

export const withError = (args: FieldArgs) =>
  snippets(
    textField({
      label: 'Saksnummer',
      description: 'Står øverst i brevet du fikk fra kommunen.',
      error: 'Fyll inn saksnummer.',
      field: { 'data-size': args['data-size'] },
    }),
  )
