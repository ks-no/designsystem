import type {
  HtmlSnippets,
  Imports,
  Snippets,
} from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Card, CardBlock } from '@ks-digital/designsystem-angular/card'
import {
  Field,
  FieldDescription,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Card, Checkbox, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
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

/** Layout with plain CSS, so the HTML is the same in every framework */
export const horizontal: HtmlSnippets = {
  html: `<article
  class="ds-card"
  data-variant="default"
  style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--ds-size-6)"
>
  <img
    src="https://static.fiks.ks.no/img/kommunevaapen/4601.png"
    alt=""
    width="64"
    height="64"
    style="flex: 0 0 auto"
  />
  <div
    style="flex: 1 1 16rem; display: flex; flex-direction: column; align-items: start; gap: var(--ds-size-3)"
  >
    <h2 class="ds-heading" data-size="sm">Brev fra kommunen</h2>
    <p class="ds-paragraph" style="color: var(--ds-color-text-subtle)">
      Fra Bergen kommune 12. november 2025
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: var(--ds-size-2)">
      <span class="ds-tag" data-color="success" data-variant="outline">Innsendt</span>
      <span class="ds-tag" data-color="info" data-variant="outline">1 ny oppgave</span>
    </div>
    <p class="ds-paragraph">
      Her kommer det en ekstra detaljtekst som gir litt mer kontekst og innhold til kortet.
      Denne teksten kan være opptil et par linjer lang.
    </p>
    <button class="ds-button" type="button" data-variant="primary">Gå til sak</button>
  </div>
</article>`,
}

export const list: Snippets = {
  html: `<ul
  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: var(--ds-size-4); margin: 0; padding: 0; list-style: none"
>
  <li class="ds-card" data-variant="default">
    <h2 class="ds-heading" data-size="xs">Byggesak 2025/1234</h2>
    <p class="ds-paragraph">Søknaden er under behandling.</p>
  </li>
  <li class="ds-card" data-variant="default">
    <h2 class="ds-heading" data-size="xs">Barnehageplass</h2>
    <p class="ds-paragraph">Du har fått tilbud om plass. Svar seinest 15. mai.</p>
  </li>
  <li class="ds-card" data-variant="default">
    <h2 class="ds-heading" data-size="xs">Parkeringstillatelse</h2>
    <p class="ds-paragraph">Tillatelsen gjelder til 31. desember.</p>
  </li>
  <li class="ds-card" data-variant="default">
    <h2 class="ds-heading" data-size="xs">Eiendomsskatt</h2>
    <p class="ds-paragraph">Neste faktura har forfall 20. mai.</p>
  </li>
</ul>`,
  angular: `<ul
  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: var(--ds-size-4); margin: 0; padding: 0; list-style: none"
>
  <li ksd-card variant="default">
    <h2 ksd-heading data-size="xs">Byggesak 2025/1234</h2>
    <p ksd-paragraph>Søknaden er under behandling.</p>
  </li>
  <li ksd-card variant="default">
    <h2 ksd-heading data-size="xs">Barnehageplass</h2>
    <p ksd-paragraph>Du har fått tilbud om plass. Svar seinest 15. mai.</p>
  </li>
  <li ksd-card variant="default">
    <h2 ksd-heading data-size="xs">Parkeringstillatelse</h2>
    <p ksd-paragraph>Tillatelsen gjelder til 31. desember.</p>
  </li>
  <li ksd-card variant="default">
    <h2 ksd-heading data-size="xs">Eiendomsskatt</h2>
    <p ksd-paragraph>Neste faktura har forfall 20. mai.</p>
  </li>
</ul>`,
  react: `<ul
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
    gap: 'var(--ds-size-4)',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  }}
>
  <Card asChild variant="default">
    <li>
      <Heading level={2} data-size="xs">Byggesak 2025/1234</Heading>
      <Paragraph>Søknaden er under behandling.</Paragraph>
    </li>
  </Card>
  <Card asChild variant="default">
    <li>
      <Heading level={2} data-size="xs">Barnehageplass</Heading>
      <Paragraph>Du har fått tilbud om plass. Svar seinest 15. mai.</Paragraph>
    </li>
  </Card>
  <Card asChild variant="default">
    <li>
      <Heading level={2} data-size="xs">Parkeringstillatelse</Heading>
      <Paragraph>Tillatelsen gjelder til 31. desember.</Paragraph>
    </li>
  </Card>
  <Card asChild variant="default">
    <li>
      <Heading level={2} data-size="xs">Eiendomsskatt</Heading>
      <Paragraph>Neste faktura har forfall 20. mai.</Paragraph>
    </li>
  </Card>
</ul>`,
}

export const withCheckbox: Snippets = {
  html: `<div
  class="ds-card"
  data-variant="default"
  data-clickdelegatefor="varsel-epost"
>
  <ds-field class="ds-field">
    <input class="ds-input" type="checkbox" id="varsel-epost" value="epost" />
    <label class="ds-label">Varsle meg på e-post</label>
    <div data-field="description">
      Du får en e-post når saken din er ferdig behandlet.
    </div>
  </ds-field>
</div>`,
  angular: `<div ksd-card variant="default" data-clickdelegatefor="varsel-epost">
  <ksd-field>
    <input ksd-input type="checkbox" id="varsel-epost" value="epost" />
    <ksd-label>Varsle meg på e-post</ksd-label>
    <div ksd-field-description>
      Du får en e-post når saken din er ferdig behandlet.
    </div>
  </ksd-field>
</div>`,
  react: `<Card variant="default" data-clickdelegatefor="varsel-epost">
  <Checkbox
    id="varsel-epost"
    label="Varsle meg på e-post"
    description="Du får en e-post når saken din er ferdig behandlet."
    value="epost"
  />
</Card>`,
}
