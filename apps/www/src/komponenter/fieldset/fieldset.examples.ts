import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Fieldset, Input, Label } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Adresse</legend>
  <p class="ds-paragraph">Adressen der du bor nå.</p>
  <ds-field class="ds-field">
    <label class="ds-label">Gateadresse</label>
    <input class="ds-input" type="text" autocomplete="street-address" />
  </ds-field>
  <ds-field class="ds-field">
    <label class="ds-label">Postnummer</label>
    <input
      class="ds-input"
      type="text"
      size="4"
      inputmode="numeric"
      autocomplete="postal-code"
    />
  </ds-field>
  <ds-field class="ds-field">
    <label class="ds-label">Poststed</label>
    <input class="ds-input" type="text" autocomplete="address-level2" />
  </ds-field>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Adresse</legend>
  <p ksd-fieldset-description>Adressen der du bor nå.</p>
  <ksd-field>
    <ksd-label>Gateadresse</ksd-label>
    <input ksd-input type="text" autocomplete="street-address" />
  </ksd-field>
  <ksd-field>
    <ksd-label>Postnummer</ksd-label>
    <input
      ksd-input
      type="text"
      size="4"
      inputmode="numeric"
      autocomplete="postal-code"
    />
  </ksd-field>
  <ksd-field>
    <ksd-label>Poststed</ksd-label>
    <input ksd-input type="text" autocomplete="address-level2" />
  </ksd-field>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Adresse</Fieldset.Legend>
  <Fieldset.Description>Adressen der du bor nå.</Fieldset.Description>
  <Field>
    <Label>Gateadresse</Label>
    <Input autoComplete="street-address" />
  </Field>
  <Field>
    <Label>Postnummer</Label>
    <Input size={4} inputMode="numeric" autoComplete="postal-code" />
  </Field>
  <Field>
    <Label>Poststed</Label>
    <Input autoComplete="address-level2" />
  </Field>
</Fieldset>`,
}
