import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  Textarea,
  angularFormsImport,
  counter,
  htmlImports,
  reactImport,
  textField,
} from '../field/form-parts'

export type TextfieldArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  label: string
  description: string
  error: string
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
  react: reactImport('Textfield'),
}

// React-only: in HTML and Angular you write out what Textfield renders
const Textfield = component({ html: 'input', react: 'Textfield' })

export const preview = ({
  label,
  description,
  error,
  ...field
}: TextfieldArgs) =>
  snippets(
    per({
      html: textField({ label, description, error, field }),
      angular: textField({ label, description, error, field }),
      react: Textfield({ label, description, error, ...field }),
    }),
  )

export const multiline = (args: TextfieldArgs) => {
  const label = 'Kort beskrivelse av saken'
  const field = { 'data-size': args['data-size'] }
  const composed = textField({
    label,
    field,
    control: Textarea,
    input: { rows: 4 },
    extra: counter(200),
  })
  return snippets(
    per({
      html: composed,
      angular: composed,
      react: Textfield({
        label,
        multiline: true,
        rows: 4,
        counter: 200,
        ...field,
      }),
    }),
  )
}
