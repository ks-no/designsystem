import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import '@ks-digital/designsystem-web'
import { Button } from '@ks-digital/designsystem-angular/button'`,
  react: `import { Button, Tooltip } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="tertiary"
  data-icon
  data-tooltip="Kopier saksnummer"
  data-placement="top"
>
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
  </svg>
</button>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="tertiary"
  data-icon
  data-tooltip="Kopier saksnummer"
  data-placement="top"
>
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
  </svg>
</button>`,
  react: `<Tooltip content="Kopier saksnummer" placement="top">
  <Button variant="tertiary" icon>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
      <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
    </svg>
  </Button>
</Tooltip>`,
}

export const description: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  data-tooltip="Utkastet lagres i 30 dager"
  data-placement="top"
>
  Lagre utkast
</button>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="secondary"
  data-tooltip="Utkastet lagres i 30 dager"
  data-placement="top"
>
  Lagre utkast
</button>`,
  react: `<Tooltip content="Utkastet lagres i 30 dager" placement="top">
  <Button variant="secondary">Lagre utkast</Button>
</Tooltip>`,
}
