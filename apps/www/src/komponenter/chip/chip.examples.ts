import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Chip } from '@ks-digital/designsystem-angular/chip'
import { Input } from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Chip } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<label class="ds-chip">
  <input
    class="ds-input"
    type="checkbox"
    name="tjeneste"
    value="barnehage"
    checked
  />
  Barnehage
</label>
<label class="ds-chip">
  <input class="ds-input" type="checkbox" name="tjeneste" value="skole" />
  Skole
</label>
<label class="ds-chip">
  <input class="ds-input" type="checkbox" name="tjeneste" value="sfo" />
  SFO
</label>`,
  angular: `<label ksd-chip>
  <input ksd-input type="checkbox" name="tjeneste" value="barnehage" checked />
  Barnehage
</label>
<label ksd-chip>
  <input ksd-input type="checkbox" name="tjeneste" value="skole" />
  Skole
</label>
<label ksd-chip>
  <input ksd-input type="checkbox" name="tjeneste" value="sfo" />
  SFO
</label>`,
  react: `<>
  <Chip.Checkbox name="tjeneste" value="barnehage" defaultChecked>
    Barnehage
  </Chip.Checkbox>
  <Chip.Checkbox name="tjeneste" value="skole">Skole</Chip.Checkbox>
  <Chip.Checkbox name="tjeneste" value="sfo">SFO</Chip.Checkbox>
</>`,
}

export const radio: Snippets = {
  html: `<label class="ds-chip">
  <input class="ds-input" type="radio" name="malform" value="bokmal" checked />
  Bokmål
</label>
<label class="ds-chip">
  <input class="ds-input" type="radio" name="malform" value="nynorsk" />
  Nynorsk
</label>`,
  angular: `<label ksd-chip>
  <input ksd-input type="radio" name="malform" value="bokmal" checked />
  Bokmål
</label>
<label ksd-chip>
  <input ksd-input type="radio" name="malform" value="nynorsk" />
  Nynorsk
</label>`,
  react: `<>
  <Chip.Radio name="malform" value="bokmal" defaultChecked>Bokmål</Chip.Radio>
  <Chip.Radio name="malform" value="nynorsk">Nynorsk</Chip.Radio>
</>`,
}

export const removable: Snippets = {
  html: `<button
  class="ds-chip"
  type="button"
  data-removable
  aria-label="Fjern filteret Barnehage"
>
  Barnehage
</button>
<button
  class="ds-chip"
  type="button"
  data-removable
  aria-label="Fjern filteret Skole"
>
  Skole
</button>`,
  angular: `<button
  ksd-chip
  type="button"
  data-removable
  aria-label="Fjern filteret Barnehage"
>
  Barnehage
</button>
<button
  ksd-chip
  type="button"
  data-removable
  aria-label="Fjern filteret Skole"
>
  Skole
</button>`,
  react: `<>
  <Chip.Removable aria-label="Fjern filteret Barnehage">Barnehage</Chip.Removable>
  <Chip.Removable aria-label="Fjern filteret Skole">Skole</Chip.Removable>
</>`,
}

export const button: Snippets = {
  html: `<button class="ds-chip" type="button">Tøm alle filtre</button>`,
  angular: `<button ksd-chip type="button">Tøm alle filtre</button>`,
  react: `<Chip.Button>Tøm alle filtre</Chip.Button>`,
}
