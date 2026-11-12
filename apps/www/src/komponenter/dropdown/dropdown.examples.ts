import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { Dropdown } from '@ks-digital/designsystem-angular/dropdown'
import { Heading } from '@ks-digital/designsystem-angular/heading'`,
  react: `import { Button, Dropdown } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<button class="ds-button" type="button" popovertarget="dropdown-last-ned">
  Last ned vedtaket
</button>
<div
  class="ds-dropdown"
  id="dropdown-last-ned"
  popover
  data-placement="bottom-end"
>
  <h2 class="ds-heading">Velg format</h2>
  <ul>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">PDF</button>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">Word</button>
    </li>
  </ul>
</div>`,
  angular: `<button ksd-button type="button" popovertarget="dropdown-last-ned">
  Last ned vedtaket
</button>
<div ksd-dropdown id="dropdown-last-ned" data-placement="bottom-end">
  <h2 ksd-heading>Velg format</h2>
  <ul>
    <li>
      <button ksd-button type="button" data-variant="tertiary">PDF</button>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">Word</button>
    </li>
  </ul>
</div>`,
  react: `<>
  <Button popoverTarget="dropdown-last-ned">Last ned vedtaket</Button>
  <Dropdown id="dropdown-last-ned" placement="bottom-end">
    <Dropdown.Heading>Velg format</Dropdown.Heading>
    <Dropdown.List>
      <Dropdown.Item>
        <Dropdown.Button>PDF</Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>Word</Dropdown.Button>
      </Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
</>`,
}

export const withLinks: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="tertiary"
  popovertarget="dropdown-bruker"
>
  Kari Nordmann
</button>
<div
  class="ds-dropdown"
  id="dropdown-bruker"
  popover
  data-placement="bottom-end"
>
  <ul>
    <li>
      <a class="ds-button" data-variant="tertiary" href="/profil">Min profil</a>
    </li>
    <li>
      <a class="ds-button" data-variant="tertiary" href="/saker">Mine saker</a>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">Logg ut</button>
    </li>
  </ul>
</div>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="tertiary"
  popovertarget="dropdown-bruker"
>
  Kari Nordmann
</button>
<div ksd-dropdown id="dropdown-bruker" data-placement="bottom-end">
  <ul>
    <li>
      <a ksd-button data-variant="tertiary" href="/profil">Min profil</a>
    </li>
    <li>
      <a ksd-button data-variant="tertiary" href="/saker">Mine saker</a>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">Logg ut</button>
    </li>
  </ul>
</div>`,
  react: `<>
  <Button variant="tertiary" popoverTarget="dropdown-bruker">
    Kari Nordmann
  </Button>
  <Dropdown id="dropdown-bruker" placement="bottom-end">
    <Dropdown.List>
      <Dropdown.Item>
        <Dropdown.Button asChild>
          <a href="/profil">Min profil</a>
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button asChild>
          <a href="/saker">Mine saker</a>
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>Logg ut</Dropdown.Button>
      </Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
</>`,
}
