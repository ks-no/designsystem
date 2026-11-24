import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Spinner } from '@ks-digital/designsystem-angular/spinner'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Paragraph, Spinner } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>`,
  angular: `<ksd-spinner aria-label="Laster inn"></ksd-spinner>`,
  react: `<Spinner aria-label="Laster inn" />`,
}

export const sizes: Snippets = {
  html: `<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
  data-size="2xs"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>
<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
  data-size="xs"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>
<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
  data-size="sm"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>
<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
  data-size="md"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>
<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
  data-size="lg"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>
<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  aria-label="Laster inn"
  data-size="xl"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>`,
  angular: `<ksd-spinner aria-label="Laster inn" data-size="2xs"></ksd-spinner>
<ksd-spinner aria-label="Laster inn" data-size="xs"></ksd-spinner>
<ksd-spinner aria-label="Laster inn" data-size="sm"></ksd-spinner>
<ksd-spinner aria-label="Laster inn" data-size="md"></ksd-spinner>
<ksd-spinner aria-label="Laster inn" data-size="lg"></ksd-spinner>
<ksd-spinner aria-label="Laster inn" data-size="xl"></ksd-spinner>`,
  react: `<>
  <Spinner aria-label="Laster inn" data-size="2xs" />
  <Spinner aria-label="Laster inn" data-size="xs" />
  <Spinner aria-label="Laster inn" data-size="sm" />
  <Spinner aria-label="Laster inn" data-size="md" />
  <Spinner aria-label="Laster inn" data-size="lg" />
  <Spinner aria-label="Laster inn" data-size="xl" />
</>`,
}

export const withText: Snippets = {
  html: `<svg
  class="ds-spinner"
  role="img"
  viewBox="0 0 50 50"
  data-size="sm"
  aria-hidden="true"
>
  <circle
    class="ds-spinner__background"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
  <circle
    class="ds-spinner__circle"
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke-width="5"
  ></circle>
</svg>
<p class="ds-paragraph">Henter søknadene dine …</p>`,
  angular: `<ksd-spinner data-size="sm" aria-hidden="true"></ksd-spinner>
<p ksd-paragraph>Henter søknadene dine …</p>`,
  react: `<>
  <Spinner data-size="sm" aria-hidden="true" />
  <Paragraph>Henter søknadene dine …</Paragraph>
</>`,
}
