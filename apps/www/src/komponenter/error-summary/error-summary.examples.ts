import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { ErrorSummary } from '@ks-digital/designsystem-angular/error-summary'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import { ErrorSummary } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-error-summary class="ds-error-summary">
  <h2 class="ds-heading">For å gå videre må du rette opp disse feilene:</h2>
  <ul class="ds-list">
    <li>
      <a class="ds-link" href="#fodselsdato" data-color="neutral">
        Fødselsdato kan ikke være etter år 2005
      </a>
    </li>
    <li>
      <a class="ds-link" href="#telefon" data-color="neutral">
        Telefonnummer kan bare inneholde siffer
      </a>
    </li>
    <li>
      <a class="ds-link" href="#epost" data-color="neutral">
        E-post må være en gyldig e-postadresse
      </a>
    </li>
  </ul>
</ds-error-summary>`,
  angular: `<div ksd-error-summary>
  <h2 ksd-heading>For å gå videre må du rette opp disse feilene:</h2>
  <ul class="ds-list">
    <li>
      <a ksd-link href="#fodselsdato" data-color="neutral">
        Fødselsdato kan ikke være etter år 2005
      </a>
    </li>
    <li>
      <a ksd-link href="#telefon" data-color="neutral">
        Telefonnummer kan bare inneholde siffer
      </a>
    </li>
    <li>
      <a ksd-link href="#epost" data-color="neutral">
        E-post må være en gyldig e-postadresse
      </a>
    </li>
  </ul>
</div>`,
  react: `<ErrorSummary>
  <ErrorSummary.Heading>
    For å gå videre må du rette opp disse feilene:
  </ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#fodselsdato">
        Fødselsdato kan ikke være etter år 2005
      </ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#telefon">
        Telefonnummer kan bare inneholde siffer
      </ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#epost">
        E-post må være en gyldig e-postadresse
      </ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>`,
}
