import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Details } from '@ks-digital/designsystem-angular/details'`,
  react: `import { Details } from '@ks-digital/designsystem-react'`,
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
    Alle barn som bor i kommunen, kan søke. Barnet må ha fylt ett år innen august.
  </div>
</details>
<details ksd-details>
  <summary>Hva koster en barnehageplass?</summary>
  <div>
    Maksprisen er fastsatt av Stortinget. Familier med lav inntekt kan søke om redusert pris.
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
      Maksprisen er fastsatt av Stortinget. Familier med lav inntekt kan søke om redusert pris.
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
