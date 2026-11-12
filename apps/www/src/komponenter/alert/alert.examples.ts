import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Alert } from '@ks-digital/designsystem-angular/alert'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Alert, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<div class="ds-alert" data-color="info">
  <h2 class="ds-heading" data-size="xs">Søknadsfristen er 1. mars</h2>
  <p class="ds-paragraph">
    Søknader som kommer inn etter fristen blir ikke behandlet.
  </p>
</div>`,
  angular: `<ksd-alert data-color="info">
  <h2 ksd-heading data-size="xs">Søknadsfristen er 1. mars</h2>
  <p ksd-paragraph>Søknader som kommer inn etter fristen blir ikke behandlet.</p>
</ksd-alert>`,
  react: `<Alert role="alert" data-color="info">
  <Heading level={2} data-size="xs">Søknadsfristen er 1. mars</Heading>
  <Paragraph>
    Søknader som kommer inn etter fristen blir ikke behandlet.
  </Paragraph>
</Alert>`,
}

export const textOnly: Snippets = {
  html: `<div class="ds-alert" data-color="info">
  Søknader som kommer inn etter fristen blir ikke behandlet.
</div>`,
  angular: `<ksd-alert data-color="info">
  Søknader som kommer inn etter fristen blir ikke behandlet.
</ksd-alert>`,
  react: `<Alert role="alert" data-color="info">
  Søknader som kommer inn etter fristen blir ikke behandlet.
</Alert>`,
}
