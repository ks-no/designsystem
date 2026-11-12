import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  FieldDescription,
  FieldError,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Input, Label, ValidationMessage } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Etternavn</label>
  <div data-field="description">Slik det står i folkeregisteret.</div>
  <input class="ds-input" type="text" />
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Etternavn</ksd-label>
  <div ksd-field-description>Slik det står i folkeregisteret.</div>
  <input ksd-input type="text" />
</ksd-field>`,
  react: `<Field>
  <Label>Etternavn</Label>
  <Field.Description>Slik det står i folkeregisteret.</Field.Description>
  <Input />
</Field>`,
}

export const withError: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Saksnummer</label>
  <div data-field="description">Står øverst i brevet du fikk fra kommunen.</div>
  <input class="ds-input" type="text" aria-invalid="true" />
  <p class="ds-validation-message" data-field="validation">
    Fyll inn saksnummer.
  </p>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Saksnummer</ksd-label>
  <div ksd-field-description>Står øverst i brevet du fikk fra kommunen.</div>
  <input ksd-input type="text" aria-invalid="true" />
  <p ksd-error>Fyll inn saksnummer.</p>
</ksd-field>`,
  react: `<Field>
  <Label>Saksnummer</Label>
  <Field.Description>
    Står øverst i brevet du fikk fra kommunen.
  </Field.Description>
  <Input aria-invalid="true" />
  <ValidationMessage>Fyll inn saksnummer.</ValidationMessage>
</Field>`,
}
