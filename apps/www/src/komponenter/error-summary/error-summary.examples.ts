import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { ErrorSummary } from '@ks-digital/designsystem-angular/error-summary'
import {
  Field,
  FieldError,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import {
  Button,
  ErrorSummary,
  Field,
  Input,
  Label,
  ValidationMessage,
} from '@ks-digital/designsystem-react'`,
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

export const withForm: Snippets = {
  html: `<form style="display: grid; gap: var(--ds-size-6)">
  <ds-field class="ds-field">
    <label class="ds-label">Fornavn</label>
    <input class="ds-input" id="fornavn" type="text" value="K" aria-invalid="true" />
    <p class="ds-validation-message" data-field="validation">
      Fornavn må ha minst to tegn
    </p>
  </ds-field>
  <ds-field class="ds-field">
    <label class="ds-label">Telefonnummer</label>
    <input
      class="ds-input"
      id="telefonnummer"
      type="tel"
      value="4123456a"
      aria-invalid="true"
    />
    <p class="ds-validation-message" data-field="validation">
      Telefonnummer kan bare inneholde siffer
    </p>
  </ds-field>
  <ds-error-summary class="ds-error-summary">
    <h2 class="ds-heading">For å gå videre må du rette opp disse feilene:</h2>
    <ul class="ds-list">
      <li>
        <a class="ds-link" href="#fornavn" data-color="neutral">
          Fornavn må ha minst to tegn
        </a>
      </li>
      <li>
        <a class="ds-link" href="#telefonnummer" data-color="neutral">
          Telefonnummer kan bare inneholde siffer
        </a>
      </li>
    </ul>
  </ds-error-summary>
  <div>
    <button class="ds-button" type="submit" data-variant="primary">Send inn</button>
  </div>
</form>`,
  angular: `<form style="display: grid; gap: var(--ds-size-6)">
  <ksd-field>
    <ksd-label>Fornavn</ksd-label>
    <input ksd-input id="fornavn" type="text" value="K" aria-invalid="true" />
    <p ksd-error>Fornavn må ha minst to tegn</p>
  </ksd-field>
  <ksd-field>
    <ksd-label>Telefonnummer</ksd-label>
    <input
      ksd-input
      id="telefonnummer"
      type="tel"
      value="4123456a"
      aria-invalid="true"
    />
    <p ksd-error>Telefonnummer kan bare inneholde siffer</p>
  </ksd-field>
  <div ksd-error-summary>
    <h2 ksd-heading>For å gå videre må du rette opp disse feilene:</h2>
    <ul class="ds-list">
      <li>
        <a ksd-link href="#fornavn" data-color="neutral">
          Fornavn må ha minst to tegn
        </a>
      </li>
      <li>
        <a ksd-link href="#telefonnummer" data-color="neutral">
          Telefonnummer kan bare inneholde siffer
        </a>
      </li>
    </ul>
  </div>
  <div>
    <button ksd-button type="submit" data-variant="primary">Send inn</button>
  </div>
</form>`,
  react: `<form style={{ display: 'grid', gap: 'var(--ds-size-6)' }}>
  <Field>
    <Label>Fornavn</Label>
    <Input id="fornavn" defaultValue="K" aria-invalid="true" />
    <ValidationMessage>Fornavn må ha minst to tegn</ValidationMessage>
  </Field>
  <Field>
    <Label>Telefonnummer</Label>
    <Input
      id="telefonnummer"
      type="tel"
      defaultValue="4123456a"
      aria-invalid="true"
    />
    <ValidationMessage>Telefonnummer kan bare inneholde siffer</ValidationMessage>
  </Field>
  <ErrorSummary>
    <ErrorSummary.Heading>
      For å gå videre må du rette opp disse feilene:
    </ErrorSummary.Heading>
    <ErrorSummary.List>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#fornavn">
          Fornavn må ha minst to tegn
        </ErrorSummary.Link>
      </ErrorSummary.Item>
      <ErrorSummary.Item>
        <ErrorSummary.Link href="#telefonnummer">
          Telefonnummer kan bare inneholde siffer
        </ErrorSummary.Link>
      </ErrorSummary.Item>
    </ErrorSummary.List>
  </ErrorSummary>
  <div>
    <Button type="submit">Send inn</Button>
  </div>
</form>`,
}
