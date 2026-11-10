import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import { Field, Input, Label, htmlImports } from '../field/form-parts'

export type ValidationMessageArgs = {
  'data-color'?: 'danger' | 'success' | 'warning' | 'info'
  'data-size'?: 'sm' | 'md' | 'lg'
  text: string
}

export const imports: Imports = {
  html: htmlImports,
  angular: `import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'`,
  react: `import {
  Field,
  Input,
  Label,
  ValidationMessage,
} from '@ks-digital/designsystem-react'`,
}

const Message = component({
  html: 'p.ds-validation-message',
  angular: 'p[ksd-validation-message]',
  react: 'ValidationMessage',
})

// React and Angular add data-field="validation"; ds-field looks for it
const validation = { 'data-field': per({ html: 'validation' }) }

export const preview = ({ text, ...attrs }: ValidationMessageArgs) =>
  snippets(Message({ ...validation, ...attrs }, text))

const invalidEmail = 'ola.nordmann.kommune.no'

export const inField = (args: ValidationMessageArgs) =>
  snippets(
    Field(
      { 'data-size': args['data-size'] },
      Label({}, 'E-post'),
      Input({
        type: 'email',
        // React: defaultValue, so the field can still be edited
        value: per({ html: invalidEmail, angular: invalidEmail }),
        defaultValue: per({ react: invalidEmail }),
        'aria-invalid': 'true',
      }),
      Message(validation, 'E-postadressen må ha med @.'),
    ),
  )
