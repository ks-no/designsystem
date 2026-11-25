import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  FieldError,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Fieldset, Radio, ValidationMessage } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Hvordan vil du få svar på søknaden?</legend>
  <p class="ds-paragraph">Vi sender svaret innen tre uker.</p>
  <ds-field class="ds-field">
    <input class="ds-input" type="radio" name="svar" value="digital" />
    <label class="ds-label">Digital postkasse</label>
  </ds-field>
  <ds-field class="ds-field">
    <input class="ds-input" type="radio" name="svar" value="brev" />
    <label class="ds-label">Brev i posten</label>
  </ds-field>
  <ds-field class="ds-field">
    <input class="ds-input" type="radio" name="svar" value="servicetorget" />
    <label class="ds-label">Hente på servicetorget</label>
  </ds-field>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Hvordan vil du få svar på søknaden?</legend>
  <p ksd-fieldset-description>Vi sender svaret innen tre uker.</p>
  <ksd-field>
    <input ksd-input type="radio" name="svar" value="digital" />
    <ksd-label>Digital postkasse</ksd-label>
  </ksd-field>
  <ksd-field>
    <input ksd-input type="radio" name="svar" value="brev" />
    <ksd-label>Brev i posten</ksd-label>
  </ksd-field>
  <ksd-field>
    <input ksd-input type="radio" name="svar" value="servicetorget" />
    <ksd-label>Hente på servicetorget</ksd-label>
  </ksd-field>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Hvordan vil du få svar på søknaden?</Fieldset.Legend>
  <Fieldset.Description>Vi sender svaret innen tre uker.</Fieldset.Description>
  <Radio label="Digital postkasse" name="svar" value="digital" />
  <Radio label="Brev i posten" name="svar" value="brev" />
  <Radio label="Hente på servicetorget" name="svar" value="servicetorget" />
</Fieldset>`,
}

export const withError: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Hvordan vil du få svar på søknaden?</legend>
  <p class="ds-paragraph">Vi sender svaret innen tre uker.</p>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="radio"
      name="svar"
      value="digital"
      aria-invalid="true"
    />
    <label class="ds-label">Digital postkasse</label>
  </ds-field>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="radio"
      name="svar"
      value="brev"
      aria-invalid="true"
    />
    <label class="ds-label">Brev i posten</label>
  </ds-field>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="radio"
      name="svar"
      value="servicetorget"
      aria-invalid="true"
    />
    <label class="ds-label">Hente på servicetorget</label>
  </ds-field>
  <p class="ds-validation-message" data-field="validation">
    Velg hvordan du vil få svar.
  </p>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Hvordan vil du få svar på søknaden?</legend>
  <p ksd-fieldset-description>Vi sender svaret innen tre uker.</p>
  <ksd-field>
    <input ksd-input type="radio" name="svar" value="digital" aria-invalid="true" />
    <ksd-label>Digital postkasse</ksd-label>
  </ksd-field>
  <ksd-field>
    <input ksd-input type="radio" name="svar" value="brev" aria-invalid="true" />
    <ksd-label>Brev i posten</ksd-label>
  </ksd-field>
  <ksd-field>
    <input
      ksd-input
      type="radio"
      name="svar"
      value="servicetorget"
      aria-invalid="true"
    />
    <ksd-label>Hente på servicetorget</ksd-label>
  </ksd-field>
  <p ksd-error>Velg hvordan du vil få svar.</p>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Hvordan vil du få svar på søknaden?</Fieldset.Legend>
  <Fieldset.Description>Vi sender svaret innen tre uker.</Fieldset.Description>
  <Radio
    label="Digital postkasse"
    name="svar"
    value="digital"
    aria-invalid="true"
  />
  <Radio label="Brev i posten" name="svar" value="brev" aria-invalid="true" />
  <Radio
    label="Hente på servicetorget"
    name="svar"
    value="servicetorget"
    aria-invalid="true"
  />
  <ValidationMessage>Velg hvordan du vil få svar.</ValidationMessage>
</Fieldset>`,
}

export const inline: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Har du fått hjelp til å fylle ut søknaden?</legend>
  <div style="display: flex; flex-wrap: wrap; gap: var(--ds-size-6)">
    <ds-field class="ds-field">
      <input class="ds-input" type="radio" name="hjelp" value="ja" />
      <label class="ds-label">Ja</label>
    </ds-field>
    <ds-field class="ds-field">
      <input class="ds-input" type="radio" name="hjelp" value="nei" />
      <label class="ds-label">Nei</label>
    </ds-field>
  </div>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Har du fått hjelp til å fylle ut søknaden?</legend>
  <div style="display: flex; flex-wrap: wrap; gap: var(--ds-size-6)">
    <ksd-field>
      <input ksd-input type="radio" name="hjelp" value="ja" />
      <ksd-label>Ja</ksd-label>
    </ksd-field>
    <ksd-field>
      <input ksd-input type="radio" name="hjelp" value="nei" />
      <ksd-label>Nei</ksd-label>
    </ksd-field>
  </div>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Har du fått hjelp til å fylle ut søknaden?</Fieldset.Legend>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-6)' }}>
    <Radio label="Ja" name="hjelp" value="ja" />
    <Radio label="Nei" name="hjelp" value="nei" />
  </div>
</Fieldset>`,
}

export const withoutVisibleLabel: Snippets = {
  html: `<ds-field class="ds-field">
  <input
    class="ds-input"
    type="radio"
    name="sak"
    value="2024/1187"
    aria-label="Velg sak 2024/1187"
  />
</ds-field>`,
  angular: `<ksd-field>
  <input
    ksd-input
    type="radio"
    name="sak"
    value="2024/1187"
    aria-label="Velg sak 2024/1187"
  />
</ksd-field>`,
  react: `<Radio name="sak" value="2024/1187" aria-label="Velg sak 2024/1187" />`,
}
