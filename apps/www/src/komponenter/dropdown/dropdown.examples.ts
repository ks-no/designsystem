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

/** Phosphor Icons (regular), inline in the HTML examples */
const icon = (path: string) =>
  `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor"><path d="${path}"></path></svg>`

const icons = {
  buildings: icon(
    'M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z',
  ),
  caretDown: icon(
    'M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z',
  ),
  envelope: icon(
    'M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z',
  ),
  filePdf: icon(
    'M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z',
  ),
  linkSimple: icon(
    'M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z',
  ),
  printer: icon(
    'M214.67,72H200V40a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8V72H41.33C27.36,72,16,82.77,16,96v80a8,8,0,0,0,8,8H56v32a8,8,0,0,0,8,8H192a8,8,0,0,0,8-8V184h32a8,8,0,0,0,8-8V96C240,82.77,228.64,72,214.67,72ZM72,48H184V72H72ZM184,208H72V160H184Zm40-40H200V152a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v16H32V96c0-4.41,4.19-8,9.33-8H214.67c5.14,0,9.33,3.59,9.33,8Zm-24-52a12,12,0,1,1-12-12A12,12,0,0,1,200,116Z',
  ),
  signOut: icon(
    'M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z',
  ),
  user: icon(
    'M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z',
  ),
  userCircle: icon(
    'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z',
  ),
}

export const proxy: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="tertiary"
  popovertarget="dropdown-fullmakt"
  aria-label="Ola Nordmann, Molde kommune"
>
  <img
    src="https://static.fiks.ks.no/img/kommunevaapen/1506.png"
    alt=""
    style="width: 1.2em; height: auto"
  />
  Ola Nordmann
  ${icons.caretDown}
</button>
<div
  class="ds-dropdown"
  id="dropdown-fullmakt"
  popover
  data-placement="bottom-end"
>
  <h2 class="ds-heading">Velg hvem du representerer</h2>
  <ul>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.buildings}
        Molde kommune
      </button>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.buildings}
        Nordmann Bygg AS
      </button>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.user}
        Ola Nordmann
      </button>
    </li>
  </ul>
  <hr class="ds-divider" aria-hidden="true" />
  <ul>
    <li>
      <a class="ds-button" data-variant="tertiary" href="/profil">
        ${icons.userCircle}
        Min profil
      </a>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.signOut}
        Logg ut
      </button>
    </li>
  </ul>
</div>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="tertiary"
  popovertarget="dropdown-fullmakt"
  aria-label="Ola Nordmann, Molde kommune"
>
  <img
    src="https://static.fiks.ks.no/img/kommunevaapen/1506.png"
    alt=""
    style="width: 1.2em; height: auto"
  />
  Ola Nordmann
  <ng-icon name="phosphorCaretDown" aria-hidden="true" />
</button>
<div ksd-dropdown id="dropdown-fullmakt" data-placement="bottom-end">
  <h2 ksd-heading>Velg hvem du representerer</h2>
  <ul>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorBuildings" aria-hidden="true" />
        Molde kommune
      </button>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorBuildings" aria-hidden="true" />
        Nordmann Bygg AS
      </button>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorUser" aria-hidden="true" />
        Ola Nordmann
      </button>
    </li>
  </ul>
  <hr class="ds-divider" aria-hidden="true" />
  <ul>
    <li>
      <a ksd-button data-variant="tertiary" href="/profil">
        <ng-icon name="phosphorUserCircle" aria-hidden="true" />
        Min profil
      </a>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorSignOut" aria-hidden="true" />
        Logg ut
      </button>
    </li>
  </ul>
</div>`,
  react: `<>
  <Button
    variant="tertiary"
    popoverTarget="dropdown-fullmakt"
    aria-label="Ola Nordmann, Molde kommune"
  >
    <img
      src="https://static.fiks.ks.no/img/kommunevaapen/1506.png"
      alt=""
      style={{ width: '1.2em', height: 'auto' }}
    />
    Ola Nordmann
    <CaretDown aria-hidden />
  </Button>
  <Dropdown id="dropdown-fullmakt" placement="bottom-end">
    <Dropdown.Heading>Velg hvem du representerer</Dropdown.Heading>
    <Dropdown.List>
      <Dropdown.Item>
        <Dropdown.Button>
          <Buildings aria-hidden />
          Molde kommune
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>
          <Buildings aria-hidden />
          Nordmann Bygg AS
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>
          <User aria-hidden />
          Ola Nordmann
        </Dropdown.Button>
      </Dropdown.Item>
    </Dropdown.List>
    <Divider />
    <Dropdown.List>
      <Dropdown.Item>
        <Dropdown.Button asChild>
          <a href="/profil">
            <UserCircle aria-hidden />
            Min profil
          </a>
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>
          <SignOut aria-hidden />
          Logg ut
        </Dropdown.Button>
      </Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
</>`,
}

export const withIcons: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  popovertarget="dropdown-del"
>
  Del vedtaket
</button>
<div class="ds-dropdown" id="dropdown-del" popover data-placement="bottom-end">
  <ul>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.printer}
        Skriv ut
      </button>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.filePdf}
        Last ned som PDF
      </button>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.envelope}
        Send på e-post
      </button>
    </li>
    <li>
      <button class="ds-button" type="button" data-variant="tertiary">
        ${icons.linkSimple}
        Kopier lenke
      </button>
    </li>
  </ul>
</div>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="secondary"
  popovertarget="dropdown-del"
>
  Del vedtaket
</button>
<div ksd-dropdown id="dropdown-del" data-placement="bottom-end">
  <ul>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorPrinter" aria-hidden="true" />
        Skriv ut
      </button>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorFilePdf" aria-hidden="true" />
        Last ned som PDF
      </button>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorEnvelopeSimple" aria-hidden="true" />
        Send på e-post
      </button>
    </li>
    <li>
      <button ksd-button type="button" data-variant="tertiary">
        <ng-icon name="phosphorLinkSimple" aria-hidden="true" />
        Kopier lenke
      </button>
    </li>
  </ul>
</div>`,
  react: `<>
  <Button variant="secondary" popoverTarget="dropdown-del">
    Del vedtaket
  </Button>
  <Dropdown id="dropdown-del" placement="bottom-end">
    <Dropdown.List>
      <Dropdown.Item>
        <Dropdown.Button>
          <Printer aria-hidden />
          Skriv ut
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>
          <FilePdf aria-hidden />
          Last ned som PDF
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>
          <EnvelopeSimple aria-hidden />
          Send på e-post
        </Dropdown.Button>
      </Dropdown.Item>
      <Dropdown.Item>
        <Dropdown.Button>
          <LinkSimple aria-hidden />
          Kopier lenke
        </Dropdown.Button>
      </Dropdown.Item>
    </Dropdown.List>
  </Dropdown>
</>`,
}
