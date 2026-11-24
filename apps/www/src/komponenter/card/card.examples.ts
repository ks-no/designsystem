import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Card, CardBlock } from '@ks-digital/designsystem-angular/card'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Card, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<div class="ds-card" data-variant="default">
  <h2 class="ds-heading" data-size="xs">Søknad om barnehageplass</h2>
  <p class="ds-paragraph">
    Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.
  </p>
</div>`,
  angular: `<div ksd-card variant="default">
  <h2 ksd-heading data-size="xs">Søknad om barnehageplass</h2>
  <p ksd-paragraph>
    Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.
  </p>
</div>`,
  react: `<Card variant="default">
  <Heading level={2} data-size="xs">Søknad om barnehageplass</Heading>
  <Paragraph>
    Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.
  </Paragraph>
</Card>`,
}

export const withLink: Snippets = {
  html: `<div
  class="ds-card"
  data-variant="default"
  data-clickdelegatefor="barnehage-lenke"
>
  <h2 class="ds-heading" data-size="xs">
    <a id="barnehage-lenke" href="#barnehage">Søk om barnehageplass</a>
  </h2>
  <p class="ds-paragraph">
    Hele kortet er klikkbart når overskriften har en lenke.
  </p>
</div>`,
  angular: `<div ksd-card variant="default">
  <h2 ksd-heading data-size="xs">
    <a href="#barnehage">Søk om barnehageplass</a>
  </h2>
  <p ksd-paragraph>Hele kortet er klikkbart når overskriften har en lenke.</p>
</div>`,
  react: `<Card variant="default">
  <Heading level={2} data-size="xs">
    <a href="#barnehage">Søk om barnehageplass</a>
  </Heading>
  <Paragraph>Hele kortet er klikkbart når overskriften har en lenke.</Paragraph>
</Card>`,
}

export const withBlocks: Snippets = {
  html: `<div class="ds-card" data-variant="default">
  <div class="ds-card__block">
    <h2 class="ds-heading" data-size="xs">Byggesak 2025/1234</h2>
  </div>
  <div class="ds-card__block">
    <p class="ds-paragraph">
      Søknaden er mottatt og venter på behandling. Saksbehandlingstiden er normalt tre uker.
    </p>
  </div>
  <div class="ds-card__block">
    <p class="ds-paragraph" data-size="sm">Sist oppdatert 12. mars</p>
  </div>
</div>`,
  angular: `<div ksd-card variant="default">
  <div ksd-card-block>
    <h2 ksd-heading data-size="xs">Byggesak 2025/1234</h2>
  </div>
  <div ksd-card-block>
    <p ksd-paragraph>
      Søknaden er mottatt og venter på behandling. Saksbehandlingstiden er normalt tre uker.
    </p>
  </div>
  <div ksd-card-block>
    <p ksd-paragraph data-size="sm">Sist oppdatert 12. mars</p>
  </div>
</div>`,
  react: `<Card variant="default">
  <Card.Block>
    <Heading level={2} data-size="xs">Byggesak 2025/1234</Heading>
  </Card.Block>
  <Card.Block>
    <Paragraph>
      Søknaden er mottatt og venter på behandling. Saksbehandlingstiden er normalt tre uker.
    </Paragraph>
  </Card.Block>
  <Card.Block>
    <Paragraph data-size="sm">Sist oppdatert 12. mars</Paragraph>
  </Card.Block>
</Card>`,
}
