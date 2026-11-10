import { snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  Textarea,
  angularFormsImport,
  counter,
  htmlImports,
  reactImport,
  textField,
} from '../field/form-parts'

export type TextareaArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  label: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport('Field', 'Input', 'Label'),
  react: reactImport('Field', 'Label', 'Textarea'),
}

export const preview = ({
  label,
  rows,
  disabled,
  readonly,
  ...field
}: TextareaArgs) =>
  snippets(
    textField({
      label,
      field,
      control: Textarea,
      input: { rows, disabled, readonly },
    }),
  )

export const withCounter = (args: TextareaArgs) =>
  snippets(
    textField({
      label: 'Kort beskrivelse av saken',
      field: { 'data-size': args['data-size'] },
      control: Textarea,
      input: { rows: 4 },
      extra: counter(200),
    }),
  )
