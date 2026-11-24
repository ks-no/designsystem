import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  FieldDescription,
  FieldError,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Checkbox, Fieldset, ValidationMessage } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <input class="ds-input" type="checkbox" value="bekreftet" />
  <label class="ds-label">Jeg bekrefter at opplysningene er riktige</label>
  <div data-field="description">Du kan endre søknaden fram til fristen.</div>
</ds-field>`,
  angular: `<ksd-field>
  <input ksd-input type="checkbox" value="bekreftet" />
  <ksd-label>Jeg bekrefter at opplysningene er riktige</ksd-label>
  <div ksd-field-description>Du kan endre søknaden fram til fristen.</div>
</ksd-field>`,
  react: `<Checkbox
  label="Jeg bekrefter at opplysningene er riktige"
  description="Du kan endre søknaden fram til fristen."
  value="bekreftet"
/>`,
}

export const inGroup: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Hvordan vil du at vi skal kontakte deg?</legend>
  <p class="ds-paragraph">Velg alle som passer.</p>
  <ds-field class="ds-field">
    <input class="ds-input" type="checkbox" name="kontakt" value="epost" />
    <label class="ds-label">E-post</label>
  </ds-field>
  <ds-field class="ds-field">
    <input class="ds-input" type="checkbox" name="kontakt" value="sms" />
    <label class="ds-label">SMS</label>
  </ds-field>
  <ds-field class="ds-field">
    <input class="ds-input" type="checkbox" name="kontakt" value="brev" />
    <label class="ds-label">Brev</label>
  </ds-field>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Hvordan vil du at vi skal kontakte deg?</legend>
  <p ksd-fieldset-description>Velg alle som passer.</p>
  <ksd-field>
    <input ksd-input type="checkbox" name="kontakt" value="epost" />
    <ksd-label>E-post</ksd-label>
  </ksd-field>
  <ksd-field>
    <input ksd-input type="checkbox" name="kontakt" value="sms" />
    <ksd-label>SMS</ksd-label>
  </ksd-field>
  <ksd-field>
    <input ksd-input type="checkbox" name="kontakt" value="brev" />
    <ksd-label>Brev</ksd-label>
  </ksd-field>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Hvordan vil du at vi skal kontakte deg?</Fieldset.Legend>
  <Fieldset.Description>Velg alle som passer.</Fieldset.Description>
  <Checkbox label="E-post" name="kontakt" value="epost" />
  <Checkbox label="SMS" name="kontakt" value="sms" />
  <Checkbox label="Brev" name="kontakt" value="brev" />
</Fieldset>`,
}

export const withError: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Hvordan vil du at vi skal kontakte deg?</legend>
  <p class="ds-paragraph">Velg alle som passer.</p>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="checkbox"
      name="kontakt"
      value="epost"
      aria-invalid="true"
    />
    <label class="ds-label">E-post</label>
  </ds-field>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="checkbox"
      name="kontakt"
      value="sms"
      aria-invalid="true"
    />
    <label class="ds-label">SMS</label>
  </ds-field>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="checkbox"
      name="kontakt"
      value="brev"
      aria-invalid="true"
    />
    <label class="ds-label">Brev</label>
  </ds-field>
  <p class="ds-validation-message" data-field="validation">
    Velg minst én måte vi kan kontakte deg på.
  </p>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Hvordan vil du at vi skal kontakte deg?</legend>
  <p ksd-fieldset-description>Velg alle som passer.</p>
  <ksd-field>
    <input
      ksd-input
      type="checkbox"
      name="kontakt"
      value="epost"
      aria-invalid="true"
    />
    <ksd-label>E-post</ksd-label>
  </ksd-field>
  <ksd-field>
    <input
      ksd-input
      type="checkbox"
      name="kontakt"
      value="sms"
      aria-invalid="true"
    />
    <ksd-label>SMS</ksd-label>
  </ksd-field>
  <ksd-field>
    <input
      ksd-input
      type="checkbox"
      name="kontakt"
      value="brev"
      aria-invalid="true"
    />
    <ksd-label>Brev</ksd-label>
  </ksd-field>
  <p ksd-error>Velg minst én måte vi kan kontakte deg på.</p>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Hvordan vil du at vi skal kontakte deg?</Fieldset.Legend>
  <Fieldset.Description>Velg alle som passer.</Fieldset.Description>
  <Checkbox label="E-post" name="kontakt" value="epost" aria-invalid="true" />
  <Checkbox label="SMS" name="kontakt" value="sms" aria-invalid="true" />
  <Checkbox label="Brev" name="kontakt" value="brev" aria-invalid="true" />
  <ValidationMessage>
    Velg minst én måte vi kan kontakte deg på.
  </ValidationMessage>
</Fieldset>`,
}
