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
  react: `import { Textfield } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Saksnummer</label>
  <div data-field="description">Står øverst i brevet du fikk fra kommunen.</div>
  <input class="ds-input" type="text" />
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Saksnummer</ksd-label>
  <div ksd-field-description>Står øverst i brevet du fikk fra kommunen.</div>
  <input ksd-input type="text" />
</ksd-field>`,
  react: `<Textfield
  label="Saksnummer"
  description="Står øverst i brevet du fikk fra kommunen."
/>`,
}

export const multiline: Snippets = {
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
  react: `<Textfield label="Kort beskrivelse av saken" multiline rows={4} counter={200} />`,
}
