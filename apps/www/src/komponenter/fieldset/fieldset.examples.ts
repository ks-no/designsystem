import { snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  angularFormsImport,
  group,
  htmlImports,
  reactImport,
  textField,
} from '../field/form-parts'

export type FieldsetArgs = {
  legend: string
  description: string
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport(
    'Field',
    'Fieldset',
    'FieldsetDescription',
    'FieldsetLegend',
    'Input',
    'Label',
  ),
  react: reactImport('Field', 'Fieldset', 'Input', 'Label'),
}

export const preview = ({ legend, description }: FieldsetArgs) =>
  snippets(
    group(
      { legend, description },
      textField({
        label: 'Gateadresse',
        input: { autocomplete: 'street-address' },
      }),
      textField({
        label: 'Postnummer',
        input: { size: 4, inputmode: 'numeric', autocomplete: 'postal-code' },
      }),
      textField({
        label: 'Poststed',
        input: { autocomplete: 'address-level2' },
      }),
    ),
  )
