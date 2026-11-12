import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Label, Textarea } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Begrunnelse</label>
  <textarea class="ds-input"></textarea>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Begrunnelse</ksd-label>
  <textarea ksd-input></textarea>
</ksd-field>`,
  react: `<Field>
  <Label>Begrunnelse</Label>
  <Textarea />
</Field>`,
}

export const withCounter: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Kort beskrivelse av saken</label>
  <textarea class="ds-input" rows="4"></textarea>
  <p class="ds-validation-message" data-field="counter" data-limit="200"></p>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Kort beskrivelse av saken</ksd-label>
  <textarea ksd-input rows="4"></textarea>
  <p class="ds-validation-message" data-field="counter" data-limit="200"></p>
</ksd-field>`,
  react: `<Field>
  <Label>Kort beskrivelse av saken</Label>
  <Textarea rows={4} />
  <Field.Counter limit={200} />
</Field>`,
}
