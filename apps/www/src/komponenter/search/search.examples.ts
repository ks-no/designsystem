import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Field, Label } from '@ks-digital/designsystem-angular/forms'
import {
  Search,
  SearchButton,
  SearchClear,
  SearchInput,
} from '@ks-digital/designsystem-angular/search'`,
  react: `import { Field, Label, Search } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-suggestion class="ds-search">
  <input class="ds-input" type="text" aria-label="Søk" />
  <button type="reset"></button>
  <button class="ds-button" type="submit" data-variant="primary">Søk</button>
</ds-suggestion>`,
  angular: `<ksd-search>
  <input ksd-search-input type="text" aria-label="Søk" />
  <button ksd-search-clear></button>
  <button ksd-search-button>Søk</button>
</ksd-search>`,
  react: `<Search>
  <Search.Input type="text" aria-label="Søk" />
  <Search.Clear />
  <Search.Button>Søk</Search.Button>
</Search>`,
}

export const withIcon: Snippets = {
  html: `<ds-suggestion class="ds-search">
  <input class="ds-input" type="search" aria-label="Søk" />
  <button type="reset"></button>
</ds-suggestion>`,
  angular: `<ksd-search>
  <input ksd-search-input aria-label="Søk" />
  <button ksd-search-clear></button>
</ksd-search>`,
  react: `<Search>
  <Search.Input aria-label="Søk" />
  <Search.Clear />
</Search>`,
}

export const withLabel: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Søk etter saksnummer eller navn</label>
  <ds-suggestion class="ds-search">
    <input class="ds-input" type="text" />
    <button type="reset"></button>
    <button class="ds-button" type="submit" data-variant="primary">Søk</button>
  </ds-suggestion>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Søk etter saksnummer eller navn</ksd-label>
  <ksd-search>
    <input ksd-search-input type="text" />
    <button ksd-search-clear></button>
    <button ksd-search-button>Søk</button>
  </ksd-search>
</ksd-field>`,
  react: `<Field>
  <Label>Søk etter saksnummer eller navn</Label>
  <Search>
    <Search.Input type="text" />
    <Search.Clear />
    <Search.Button>Søk</Search.Button>
  </Search>
</Field>`,
}

export const inForm: Snippets = {
  html: `<form role="search" action="/sok">
  <ds-suggestion class="ds-search">
    <input class="ds-input" type="text" name="q" aria-label="Søk på nettstedet" />
    <button type="reset"></button>
    <button class="ds-button" type="submit" data-variant="primary">Søk</button>
  </ds-suggestion>
</form>`,
  angular: `<form role="search" action="/sok">
  <ksd-search>
    <input ksd-search-input type="text" name="q" aria-label="Søk på nettstedet" />
    <button ksd-search-clear></button>
    <button ksd-search-button>Søk</button>
  </ksd-search>
</form>`,
  react: `<form role="search" action="/sok">
  <Search>
    <Search.Input type="text" name="q" aria-label="Søk på nettstedet" />
    <Search.Clear />
    <Search.Button>Søk</Search.Button>
  </Search>
</form>`,
}
