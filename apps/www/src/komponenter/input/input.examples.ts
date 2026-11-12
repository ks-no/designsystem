import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Input, Label } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">E-post</label>
  <input class="ds-input" type="email" />
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>E-post</ksd-label>
  <input ksd-input type="email" />
</ksd-field>`,
  react: `<Field>
  <Label>E-post</Label>
  <Input type="email" />
</Field>`,
}

export const width: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Postnummer</label>
  <input
    class="ds-input"
    type="text"
    size="4"
    inputmode="numeric"
    autocomplete="postal-code"
  />
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Postnummer</ksd-label>
  <input
    ksd-input
    type="text"
    size="4"
    inputmode="numeric"
    autocomplete="postal-code"
  />
</ksd-field>`,
  react: `<Field>
  <Label>Postnummer</Label>
  <Input size={4} inputMode="numeric" autoComplete="postal-code" />
</Field>`,
}
