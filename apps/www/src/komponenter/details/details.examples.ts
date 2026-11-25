import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Card } from '@ks-digital/designsystem-angular/card'
import { Details } from '@ks-digital/designsystem-angular/details'`,
  react: `import { Card, Details } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<details class="ds-details">
  <summary>Hvilke vedlegg må jeg sende med?</summary>
  <div>
    Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
  </div>
</details>`,
  angular: `<details ksd-details>
  <summary>Hvilke vedlegg må jeg sende med?</summary>
  <div>
    Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
  </div>
</details>`,
  react: `<Details>
  <Details.Summary>Hvilke vedlegg må jeg sende med?</Details.Summary>
  <Details.Content>
    Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
  </Details.Content>
</Details>`,
}

export const several: Snippets = {
  html: `<details class="ds-details">
  <summary>Hvem kan søke om barnehageplass?</summary>
  <div>
    Alle barn som bor i kommunen, kan søke. Barnet må ha fylt ett år innen august.
  </div>
</details>
<details class="ds-details">
  <summary>Hva koster en barnehageplass?</summary>
  <div>
    Maksprisen er fastsatt av Stortinget. Familier med lav inntekt kan søke om redusert pris.
  </div>
</details>
<details class="ds-details">
  <summary>Når får jeg svar?</summary>
  <div>Du får svar på søknaden innen utgangen av april.</div>
</details>`,
  angular: `<details ksd-details>
  <summary>Hvem kan søke om barnehageplass?</summary>
  <div>
    Alle barn som bor i kommunen, kan søke.
  </div>
</details>
<details ksd-details>
  <summary>Hva koster en barnehageplass?</summary>
  <div>
    Maksprisen er fastsatt av Stortinget.
  </div>
</details>
<details ksd-details>
  <summary>Når får jeg svar?</summary>
  <div>Du får svar på søknaden innen utgangen av april.</div>
</details>`,
  react: `<>
  <Details>
    <Details.Summary>Hvem kan søke om barnehageplass?</Details.Summary>
    <Details.Content>
      Alle barn som bor i kommunen, kan søke. Barnet må ha fylt ett år innen august.
    </Details.Content>
  </Details>
  <Details>
    <Details.Summary>Hva koster en barnehageplass?</Details.Summary>
    <Details.Content>
      Maksprisen er fastsatt av Stortinget.
    </Details.Content>
  </Details>
  <Details>
    <Details.Summary>Når får jeg svar?</Details.Summary>
    <Details.Content>
      Du får svar på søknaden innen utgangen av april.
    </Details.Content>
  </Details>
</>`,
}

export const inCard: Snippets = {
  html: `<div class="ds-card" data-variant="default">
  <details class="ds-details">
    <summary>Hvem kan søke barnehageplass?</summary>
    <div>
        Alle barn som bor i kommunen, kan søke.
    </div>
  </details>
  <details class="ds-details">
    <summary>Hvor lang er saksbehandlingstiden?</summary>
    <div>Vi behandler søknaden innen fire uker.</div>
  </details>
</div>`,
  angular: `<div ksd-card variant="default">
  <details ksd-details>
    <summary>Hvem kan søke barnehageplass?</summary>
    <div>
      Alle barn som bor i kommunen, kan søke. Barnet må ha fylt ett år innen august.
    </div>
  </details>
  <details ksd-details>
    <summary>Hvor lang er saksbehandlingstiden?</summary>
    <div>Vi behandler søknaden innen fire uker.</div>
  </details>
</div>`,
  react: `<Card variant="default">
  <Details>
    <Details.Summary>Hvem kan søke barnehageplass?</Details.Summary>
    <Details.Content>
      Alle barn som bor i kommunen, kan søke. Barnet må ha fylt ett år innen august.
    </Details.Content>
  </Details>
  <Details>
    <Details.Summary>Hvor lang er saksbehandlingstiden?</Details.Summary>
    <Details.Content>Vi behandler søknaden innen fire uker.</Details.Content>
  </Details>
</Card>`,
}

export const inCardWithColor: Snippets = {
  html: `<div class="ds-card" data-variant="default">
  <details class="ds-details" data-color="accent">
    <summary>Hvilke vedlegg må jeg sende med?</summary>
    <div>
      Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
    </div>
  </details>
</div>
<div class="ds-card" data-variant="default">
  <details class="ds-details" data-color="accent" data-variant="tinted">
    <summary>Hvilke vedlegg må jeg sende med?</summary>
    <div>
      Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
    </div>
  </details>
</div>`,
  angular: `<div ksd-card variant="default">
  <details ksd-details data-color="accent">
    <summary>Hvilke vedlegg må jeg sende med?</summary>
    <div>
      Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
    </div>
  </details>
</div>
<div ksd-card variant="default">
  <details ksd-details data-color="accent" data-variant="tinted">
    <summary>Hvilke vedlegg må jeg sende med?</summary>
    <div>
      Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
    </div>
  </details>
</div>`,
  react: `<>
  <Card variant="default">
    <Details data-color="accent">
      <Details.Summary>Hvilke vedlegg må jeg sende med?</Details.Summary>
      <Details.Content>
        Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
      </Details.Content>
    </Details>
  </Card>
  <Card variant="default">
    <Details data-color="accent" variant="tinted">
      <Details.Summary>Hvilke vedlegg må jeg sende med?</Details.Summary>
      <Details.Content>
        Du må legge ved skattemeldingen og dokumentasjon på inntekt for alle i husstanden.
      </Details.Content>
    </Details>
  </Card>
</>`,
}
