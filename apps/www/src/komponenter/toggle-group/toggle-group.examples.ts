import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  react: `import { ToggleGroup } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<fieldset
  class="ds-toggle-group"
  aria-label="Visning"
  focusgroup="radiogroup"
>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning" value="liste" checked />
    Liste
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning" value="kart" />
    Kart
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning" value="kalender" />
    Kalender
  </label>
</fieldset>`,
  angular: `<fieldset
  class="ds-toggle-group"
  aria-label="Visning"
  focusgroup="radiogroup"
>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning" value="liste" checked />
    Liste
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning" value="kart" />
    Kart
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning" value="kalender" />
    Kalender
  </label>
</fieldset>`,
  react: `<ToggleGroup aria-label="Visning" defaultValue="liste">
  <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
  <ToggleGroup.Item value="kart">Kart</ToggleGroup.Item>
  <ToggleGroup.Item value="kalender">Kalender</ToggleGroup.Item>
</ToggleGroup>`,
}

export const variants: Snippets = {
  html: `<fieldset
  class="ds-toggle-group"
  aria-label="Visning"
  focusgroup="radiogroup"
  data-variant="primary"
>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-primary" value="liste" checked />
    Liste
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-primary" value="kart" />
    Kart
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-primary" value="kalender" />
    Kalender
  </label>
</fieldset>
<fieldset
  class="ds-toggle-group"
  aria-label="Visning"
  focusgroup="radiogroup"
  data-variant="secondary"
>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-secondary" value="liste" checked />
    Liste
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-secondary" value="kart" />
    Kart
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-secondary" value="kalender" />
    Kalender
  </label>
</fieldset>`,
  angular: `<fieldset
  class="ds-toggle-group"
  aria-label="Visning"
  focusgroup="radiogroup"
  data-variant="primary"
>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-primary" value="liste" checked />
    Liste
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-primary" value="kart" />
    Kart
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-primary" value="kalender" />
    Kalender
  </label>
</fieldset>
<fieldset
  class="ds-toggle-group"
  aria-label="Visning"
  focusgroup="radiogroup"
  data-variant="secondary"
>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-secondary" value="liste" checked />
    Liste
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-secondary" value="kart" />
    Kart
  </label>
  <label class="ds-button" data-variant="tertiary">
    <input type="radio" name="visning-secondary" value="kalender" />
    Kalender
  </label>
</fieldset>`,
  react: `<>
  <ToggleGroup aria-label="Visning" defaultValue="liste" variant="primary">
    <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
    <ToggleGroup.Item value="kart">Kart</ToggleGroup.Item>
    <ToggleGroup.Item value="kalender">Kalender</ToggleGroup.Item>
  </ToggleGroup>
  <ToggleGroup aria-label="Visning" defaultValue="liste" variant="secondary">
    <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
    <ToggleGroup.Item value="kart">Kart</ToggleGroup.Item>
    <ToggleGroup.Item value="kalender">Kalender</ToggleGroup.Item>
  </ToggleGroup>
</>`,
}
