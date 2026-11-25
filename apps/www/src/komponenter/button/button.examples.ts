import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'`,
  react: `import { Button } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<button class="ds-button" type="button" data-variant="primary">Knapp</button>`,
  angular: `<button ksd-button data-variant="primary">Knapp</button>`,
  react: `<Button variant="primary">Knapp</Button>`,
}

export const variants: Snippets = {
  html: `<button class="ds-button" type="button" data-variant="primary">Primary</button>
<button class="ds-button" type="button" data-variant="secondary">
  Secondary
</button>
<button class="ds-button" type="button" data-variant="tertiary">
  Tertiary
</button>`,
  angular: `<button ksd-button data-variant="primary">Primary</button>
<button ksd-button data-variant="secondary">Secondary</button>
<button ksd-button data-variant="tertiary">Tertiary</button>`,
  react: `<>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
</>`,
}

export const icons: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="primary"
  data-icon
  aria-label="Legg til i favoritter"
>
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path>
  </svg>
</button>`,
  angular: `<button
  ksd-button
  data-variant="primary"
  data-icon
  aria-label="Legg til i favoritter"
>
  <ng-icon name="phosphorHeart" aria-hidden="true" />
</button>`,
  react: `<Button variant="primary" icon aria-label="Legg til i favoritter">
  <Heart aria-hidden />
</Button>`,
}

export const loading: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="primary"
  aria-busy="true"
>
  <svg class="ds-spinner" role="img" viewBox="0 0 50 50" aria-hidden="true">
    <circle class="ds-spinner__background" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    <circle class="ds-spinner__circle" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>
  Lagrer …
</button>`,
  angular: `<button ksd-button data-variant="primary" loading>Lagrer …</button>`,
  react: `<Button variant="primary" loading>Lagrer …</Button>`,
}
