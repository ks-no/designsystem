import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  react: `import { SkipLink } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<a class="ds-skip-link" href="#hovedinnhold">Hopp til hovedinnhold</a>
<main id="hovedinnhold" tabindex="-1">Hovedinnholdet på siden</main>`,
  angular: `<a class="ds-skip-link" href="#hovedinnhold">Hopp til hovedinnhold</a>
<main id="hovedinnhold" tabindex="-1">Hovedinnholdet på siden</main>`,
  react: `<>
  <SkipLink href="#hovedinnhold">Hopp til hovedinnhold</SkipLink>
  <main id="hovedinnhold" tabIndex={-1}>Hovedinnholdet på siden</main>
</>`,
}
