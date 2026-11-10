/**
 * Building blocks shared by the form component examples (Field, Input, Checkbox, …).
 *
 * HTML uses `<ds-field>`, which connects label, description and validation message to the
 * input (`for`, `id`, `aria-describedby`). Angular's `ksd-field` and React's `Field` render
 * the same element, so none of the examples need fixed ids.
 */
import {
  component,
  per,
  type Attrs,
  type Child,
  type Component,
} from '@internal/storybook/markup'

export const htmlImports = `// Registrerer <ds-field> og resten, én gang i applikasjonen
import '@ks-digital/designsystem-web'`

/** `import { … } from '@ks-digital/designsystem-angular/forms'` */
export const angularFormsImport = (...names: string[]) =>
  `import {\n${names.map((n) => `  ${n},`).join('\n')}\n} from '@ks-digital/designsystem-angular/forms'`

/** `import { … } from '@ks-digital/designsystem-react'` */
export const reactImport = (...names: string[]) =>
  `import { ${names.join(', ')} } from '@ks-digital/designsystem-react'`

export const Field = component({
  html: 'ds-field.ds-field',
  angular: 'ksd-field',
  react: 'Field',
  reactProps: { 'data-position': 'position' },
})

export const Label = component({
  html: 'label.ds-label',
  angular: 'ksd-label',
  react: 'Label',
})

export const Input = component({
  html: 'input.ds-input',
  angular: 'input[ksd-input]',
  react: 'Input',
})

export const Textarea = component({
  html: 'textarea.ds-input',
  angular: 'textarea[ksd-input]',
  react: 'Textarea',
})

export const Select = component({
  html: 'select.ds-input',
  angular: 'select[ksd-input]',
  react: 'Select',
})

export const Option = component({ html: 'option', react: 'Select.Option' })

export const Optgroup = component({
  html: 'optgroup',
  react: 'Select.Optgroup',
})

const Description = component({
  html: 'div',
  angular: 'div[ksd-field-description]',
  react: 'Field.Description',
})

/** Help text under the label. React renders a `div` with `data-field="description"`. */
export const FieldDescription = (text: string) =>
  Description({ 'data-field': per({ html: 'description' }) }, text)

const ErrorMessage = component({
  html: 'p.ds-validation-message',
  angular: 'p[ksd-error]',
  react: 'ValidationMessage',
})

/** Validation message in a Field or Fieldset. `data-field` is what `ds-field` looks for. */
export const FieldError = (text: string) =>
  ErrorMessage({ 'data-field': per({ html: 'validation' }) }, text)

/** Character counter: `ds-field` fills in the text and updates it as the user types */
const FieldCounter = component({
  html: 'p.ds-validation-message',
  react: 'Field.Counter',
  reactProps: { 'data-limit': 'limit' },
})

export const counter = (limit: number) =>
  FieldCounter({
    'data-field': per({ html: 'counter', angular: 'counter' }),
    'data-limit': limit,
  })

export const Fieldset = component({
  html: 'fieldset.ds-fieldset',
  angular: 'fieldset[ksd-fieldset]',
  react: 'Fieldset',
})

export const Legend = component({
  html: 'legend.ds-label',
  angular: 'legend[ksd-fieldset-legend]',
  react: 'Fieldset.Legend',
})

/** React's Fieldset.Description is a Paragraph */
export const FieldsetDescription = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-fieldset-description]',
  react: 'Fieldset.Description',
})

export interface TextFieldOptions {
  label: string
  description?: string
  error?: string
  /** On the Field: `data-size`, `data-color` */
  field?: Attrs
  /** On the input, textarea or select */
  input?: Attrs
  /** Input (default), Textarea or Select */
  control?: Component
  /** Children of the control, e.g. options in a select */
  options?: Child[]
  /** Added after the control, e.g. a counter */
  extra?: Child
}

/** Label, optional description, the control and optional validation message in a Field */
export function textField({
  label,
  description,
  error,
  field = {},
  input = {},
  control = Input,
  options = [],
  extra,
}: TextFieldOptions) {
  return Field(
    field,
    Label({}, label),
    description && FieldDescription(description),
    control(
      {
        ...(control === Input
          ? { type: per({ html: 'text', angular: 'text' }) }
          : {}),
        ...input,
        'aria-invalid': error ? 'true' : undefined,
      },
      ...options,
    ),
    extra,
    error && FieldError(error),
  )
}

export type ToggleType = 'checkbox' | 'radio' | 'switch'

export interface ToggleOptions {
  label: string
  description?: string
  error?: string
  name?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  'data-size'?: string
  'data-variant'?: string
  'data-position'?: string
}

const REACT_TOGGLE: Record<ToggleType, string> = {
  checkbox: 'Checkbox',
  radio: 'Radio',
  switch: 'Switch',
}

/**
 * A checkbox, radio or switch with its label. HTML and Angular build it from Field, Input
 * and Label; React has a component for each that does the same.
 */
export function toggle(type: ToggleType, options: ToggleOptions): Child {
  const {
    label,
    description,
    error,
    name,
    value,
    checked,
    disabled,
    readonly,
    invalid,
    ...field
  } = options
  const inputAttrs: Attrs = {
    name,
    value,
    checked: per({ html: checked, angular: checked }),
    defaultChecked: per({ react: checked }),
    disabled,
    readonly,
    'aria-invalid': invalid || error ? 'true' : undefined,
  }

  const composed = Field(
    field,
    Input({
      type: type === 'switch' ? 'checkbox' : type,
      role: type === 'switch' ? 'switch' : undefined,
      ...inputAttrs,
    }),
    Label({}, label),
    description && FieldDescription(description),
    error && FieldError(error),
  )

  const react = component({ html: 'input', react: REACT_TOGGLE[type] })({
    label,
    description,
    error: type === 'switch' ? undefined : error,
    ...inputAttrs,
    'data-size': field['data-size'],
    variant: field['data-variant'],
    position: field['data-position'],
  })

  return per({ html: composed, angular: composed, react })
}

export interface GroupOptions {
  legend: string
  description?: string
  /** Validation message for the whole group, last in the fieldset */
  error?: string
  fieldset?: Attrs
}

/** Fields that belong together in a Fieldset with a legend */
export function group(
  { legend, description, error, fieldset = {} }: GroupOptions,
  ...children: Child[]
) {
  return Fieldset(
    fieldset,
    Legend({}, legend),
    description && FieldsetDescription({}, description),
    ...children,
    error && FieldError(error),
  )
}
