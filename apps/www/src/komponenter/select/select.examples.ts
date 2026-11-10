import { per, raw, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  Optgroup,
  Option,
  Select,
  angularFormsImport,
  htmlImports,
  reactImport,
  textField,
} from '../field/form-parts'

export type SelectArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  label: string
  disabled?: boolean
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport('Field', 'Input', 'Label'),
  react: reactImport('Field', 'Label', 'Select'),
}

// An empty first option, so nothing is chosen until the user picks a municipality.
// Written as raw markup because the helper leaves out empty attributes (value="").
const placeholder = (text: string) =>
  per({
    html: raw(`<option value="">${text}</option>`),
    angular: raw(`<option value="">${text}</option>`),
    react: raw(`<Select.Option value="">${text}</Select.Option>`),
  })

const municipalities = [
  ['4601', 'Bergen'],
  ['0301', 'Oslo'],
  ['1103', 'Stavanger'],
  ['5001', 'Trondheim'],
]

export const preview = ({ label, disabled, ...field }: SelectArgs) =>
  snippets(
    textField({
      label,
      field,
      control: Select,
      input: { disabled },
      options: [
        placeholder('Velg kommune'),
        ...municipalities.map(([value, name]) => Option({ value }, name)),
      ],
    }),
  )

const counties: Array<[string, string[][]]> = [
  [
    'Rogaland',
    [
      ['1103', 'Stavanger'],
      ['1108', 'Sandnes'],
    ],
  ],
  [
    'Vestland',
    [
      ['4601', 'Bergen'],
      ['4621', 'Voss'],
    ],
  ],
]

export const groups = (args: SelectArgs) =>
  snippets(
    textField({
      label: 'Kommune',
      field: { 'data-size': args['data-size'] },
      control: Select,
      options: [
        placeholder('Velg kommune'),
        ...counties.map(([county, list]) =>
          Optgroup(
            { label: county },
            ...list.map(([value, name]) => Option({ value }, name)),
          ),
        ),
      ],
    }),
  )
