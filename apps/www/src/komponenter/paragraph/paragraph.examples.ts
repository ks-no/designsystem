import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<p class="ds-paragraph" data-variant="default">
  Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars.
</p>`,
  angular: `<p ksd-paragraph data-variant="default">
  Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars.
</p>`,
  react: `<Paragraph variant="default">
  Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars.
</Paragraph>`,
}

export const variants: Snippets = {
  html: `<p class="ds-paragraph" data-variant="long">
  Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars, og du får svar innen utgangen av april. Plass tildeles etter alder og bosted.
</p>
<p class="ds-paragraph" data-variant="short">
  Saksnummer 2025/1234. Sist oppdatert 12. mars.
</p>`,
  angular: `<p ksd-paragraph data-variant="long">
  Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars, og du får svar innen utgangen av april. Plass tildeles etter alder og bosted.
</p>
<p ksd-paragraph data-variant="short">
  Saksnummer 2025/1234. Sist oppdatert 12. mars.
</p>`,
  react: `<>
  <Paragraph variant="long">
    Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars, og du får svar innen utgangen av april. Plass tildeles etter alder og bosted.
  </Paragraph>
  <Paragraph variant="short">
    Saksnummer 2025/1234. Sist oppdatert 12. mars.
  </Paragraph>
</>`,
}
