import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  FieldDescription,
  Fieldset,
  FieldsetLegend,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Fieldset, Switch } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <input class="ds-input" type="checkbox" role="switch" name="varsel-sms" />
  <label class="ds-label">Varsle meg på SMS</label>
  <div data-field="description">Vi sender SMS når det skjer noe i saken din.</div>
</ds-field>`,
  angular: `<ksd-field>
  <input ksd-input type="checkbox" role="switch" name="varsel-sms" />
  <ksd-label>Varsle meg på SMS</ksd-label>
  <div ksd-field-description>Vi sender SMS når det skjer noe i saken din.</div>
</ksd-field>`,
  react: `<Switch
  label="Varsle meg på SMS"
  description="Vi sender SMS når det skjer noe i saken din."
  name="varsel-sms"
/>`,
}

export const inGroup: Snippets = {
  html: `<fieldset class="ds-fieldset">
  <legend class="ds-label">Varsle meg når saken er oppdatert</legend>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="checkbox"
      role="switch"
      name="varsel"
      value="sms"
      checked
    />
    <label class="ds-label">SMS</label>
  </ds-field>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="checkbox"
      role="switch"
      name="varsel"
      value="epost"
    />
    <label class="ds-label">E-post</label>
  </ds-field>
  <ds-field class="ds-field">
    <input
      class="ds-input"
      type="checkbox"
      role="switch"
      name="varsel"
      value="digital-postkasse"
    />
    <label class="ds-label">Digital postkasse</label>
  </ds-field>
</fieldset>`,
  angular: `<fieldset ksd-fieldset>
  <legend ksd-fieldset-legend>Varsle meg når saken er oppdatert</legend>
  <ksd-field>
    <input
      ksd-input
      type="checkbox"
      role="switch"
      name="varsel"
      value="sms"
      checked
    />
    <ksd-label>SMS</ksd-label>
  </ksd-field>
  <ksd-field>
    <input ksd-input type="checkbox" role="switch" name="varsel" value="epost" />
    <ksd-label>E-post</ksd-label>
  </ksd-field>
  <ksd-field>
    <input
      ksd-input
      type="checkbox"
      role="switch"
      name="varsel"
      value="digital-postkasse"
    />
    <ksd-label>Digital postkasse</ksd-label>
  </ksd-field>
</fieldset>`,
  react: `<Fieldset>
  <Fieldset.Legend>Varsle meg når saken er oppdatert</Fieldset.Legend>
  <Switch label="SMS" name="varsel" value="sms" defaultChecked />
  <Switch label="E-post" name="varsel" value="epost" />
  <Switch label="Digital postkasse" name="varsel" value="digital-postkasse" />
</Fieldset>`,
}

export const end: Snippets = {
  html: `<ds-field class="ds-field" data-position="end">
  <input class="ds-input" type="checkbox" role="switch" name="mine-saker" />
  <label class="ds-label">Vis bare mine saker</label>
</ds-field>`,
  angular: `<ksd-field data-position="end">
  <input ksd-input type="checkbox" role="switch" name="mine-saker" />
  <ksd-label>Vis bare mine saker</ksd-label>
</ksd-field>`,
  react: `<Switch label="Vis bare mine saker" name="mine-saker" position="end" />`,
}
