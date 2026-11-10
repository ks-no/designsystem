import { per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  angularFormsImport,
  htmlImports,
  reactImport,
  textField,
} from '../field/form-parts'

export type InputArgs = {
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'password'
  'data-size'?: 'sm' | 'md' | 'lg'
  label: string
  disabled?: boolean
  readonly?: boolean
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport('Field', 'Input', 'Label'),
  react: reactImport('Field', 'Input', 'Label'),
}

export const preview = ({
  label,
  type,
  disabled,
  readonly,
  ...field
}: InputArgs) =>
  snippets(
    textField({
      label,
      field,
      // React's Input is type="text" unless you say otherwise
      input: {
        type: type === 'text' ? per({ html: 'text', angular: 'text' }) : type,
        disabled,
        readonly,
      },
    }),
  )

export const width = (args: InputArgs) =>
  snippets(
    textField({
      label: 'Postnummer',
      field: { 'data-size': args['data-size'] },
      input: {
        size: 4,
        inputmode: 'numeric',
        autocomplete: 'postal-code',
      },
    }),
  )
