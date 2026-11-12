import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Heading } from '@ks-digital/designsystem-angular/heading'`,
  react: `import { Heading } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<h2 class="ds-heading" data-size="md">Søknad om barnehageplass</h2>`,
  angular: `<h2 ksd-heading data-size="md">Søknad om barnehageplass</h2>`,
  react: `<Heading level={2} data-size="md">Søknad om barnehageplass</Heading>`,
}

export const sizes: Snippets = {
  html: `<h2 class="ds-heading" data-size="2xl">2xl</h2>
<h2 class="ds-heading" data-size="xl">xl</h2>
<h2 class="ds-heading" data-size="lg">lg</h2>
<h2 class="ds-heading" data-size="md">md</h2>
<h2 class="ds-heading" data-size="sm">sm</h2>
<h2 class="ds-heading" data-size="xs">xs</h2>
<h2 class="ds-heading" data-size="2xs">2xs</h2>`,
  angular: `<h2 ksd-heading data-size="2xl">2xl</h2>
<h2 ksd-heading data-size="xl">xl</h2>
<h2 ksd-heading data-size="lg">lg</h2>
<h2 ksd-heading data-size="md">md</h2>
<h2 ksd-heading data-size="sm">sm</h2>
<h2 ksd-heading data-size="xs">xs</h2>
<h2 ksd-heading data-size="2xs">2xs</h2>`,
  react: `<>
  <Heading level={2} data-size="2xl">2xl</Heading>
  <Heading level={2} data-size="xl">xl</Heading>
  <Heading level={2} data-size="lg">lg</Heading>
  <Heading level={2} data-size="md">md</Heading>
  <Heading level={2} data-size="sm">sm</Heading>
  <Heading level={2} data-size="xs">xs</Heading>
  <Heading level={2} data-size="2xs">2xs</Heading>
</>`,
}

export const levelAndSize: Snippets = {
  html: `<h1 class="ds-heading" data-size="lg">Søknad om byggetillatelse</h1>
<h2 class="ds-heading" data-size="sm">Om tiltaket</h2>`,
  angular: `<h1 ksd-heading data-size="lg">Søknad om byggetillatelse</h1>
<h2 ksd-heading data-size="sm">Om tiltaket</h2>`,
  react: `<>
  <Heading level={1} data-size="lg">Søknad om byggetillatelse</Heading>
  <Heading level={2} data-size="sm">Om tiltaket</Heading>
</>`,
}
