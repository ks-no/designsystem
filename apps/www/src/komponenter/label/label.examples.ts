import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Input, Label } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label" for="fullt-navn">Fullt navn</label>
  <input class="ds-input" id="fullt-navn" type="text" />
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Fullt navn</ksd-label>
  <input ksd-input type="text" />
</ksd-field>`,
  react: `<Field>
  <Label>Fullt navn</Label>
  <Input type="text" />
</Field>`,
}
