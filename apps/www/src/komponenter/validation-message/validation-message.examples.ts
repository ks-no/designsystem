import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'`,
  react: `import {
  Field,
  Input,
  Label,
  ValidationMessage,
} from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<p class="ds-validation-message" data-field="validation">
  Fyll inn saksnummer.
</p>`,
  angular: `<p ksd-validation-message>Fyll inn saksnummer.</p>`,
  react: `<ValidationMessage>Fyll inn saksnummer.</ValidationMessage>`,
}

export const inField: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">E-post</label>
  <input
    class="ds-input"
    type="email"
    value="ola.nordmann.kommune.no"
    aria-invalid="true"
  />
  <p class="ds-validation-message" data-field="validation">
    E-postadressen må ha med @.
  </p>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>E-post</ksd-label>
  <input
    ksd-input
    type="email"
    value="ola.nordmann.kommune.no"
    aria-invalid="true"
  />
  <p ksd-validation-message>E-postadressen må ha med @.</p>
</ksd-field>`,
  react: `<Field>
  <Label>E-post</Label>
  <Input
    type="email"
    defaultValue="ola.nordmann.kommune.no"
    aria-invalid="true"
  />
  <ValidationMessage>E-postadressen må ha med @.</ValidationMessage>
</Field>`,
}
