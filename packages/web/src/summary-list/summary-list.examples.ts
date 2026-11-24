import type { Snippets } from '@internal/storybook/snippets'

export const preview: Snippets = {
  html: `<dl class="ksd-summary-list">
  <div>
    <dt>Navn</dt>
    <dd>Sarah Philips</dd>
  </div>
  <div>
    <dt>Fødselsnummer</dt>
    <dd>12345678901</dd>
  </div>
  <div>
    <dt>Adresse</dt>
    <dd>Storgata 1, 0155 Oslo</dd>
  </div>
  <div>
    <dt>Saksnummer</dt>
    <dd>2026/01482-7</dd>
  </div>
</dl>`,
  angular: `<dl class="ksd-summary-list">
  <div>
    <dt>Navn</dt>
    <dd>Sarah Philips</dd>
  </div>
  <div>
    <dt>Fødselsnummer</dt>
    <dd>12345678901</dd>
  </div>
  <div>
    <dt>Adresse</dt>
    <dd>Storgata 1, 0155 Oslo</dd>
  </div>
  <div>
    <dt>Saksnummer</dt>
    <dd>2026/01482-7</dd>
  </div>
</dl>`,
  react: `<dl className="ksd-summary-list">
  <div>
    <dt>Navn</dt>
    <dd>Sarah Philips</dd>
  </div>
  <div>
    <dt>Fødselsnummer</dt>
    <dd>12345678901</dd>
  </div>
  <div>
    <dt>Adresse</dt>
    <dd>Storgata 1, 0155 Oslo</dd>
  </div>
  <div>
    <dt>Saksnummer</dt>
    <dd>2026/01482-7</dd>
  </div>
</dl>`,
}

export const inCard: Snippets = {
  html: `<article class="ds-card">
  <h2 class="ds-heading ds-card__block" data-size="xs">
    Søknad om ledsagerbevis
  </h2>
  <div class="ds-card__block">
    <dl class="ksd-summary-list">
      <div>
        <dt>Navn</dt>
        <dd>Sarah Philips</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> navn</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Fødselsnummer</dt>
        <dd>12345678901</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> fødselsnummer</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Adresse</dt>
        <dd>Storgata 1, 0155 Oslo</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> adresse</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Saksnummer</dt>
        <dd>2026/01482-7</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> saksnummer</span>
          </a>
        </dd>
      </div>
    </dl>
  </div>
</article>`,
  angular: `<article class="ds-card">
  <h2 class="ds-heading ds-card__block" data-size="xs">
    Søknad om ledsagerbevis
  </h2>
  <div class="ds-card__block">
    <dl class="ksd-summary-list">
      <div>
        <dt>Navn</dt>
        <dd>Sarah Philips</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> navn</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Fødselsnummer</dt>
        <dd>12345678901</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> fødselsnummer</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Adresse</dt>
        <dd>Storgata 1, 0155 Oslo</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> adresse</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Saksnummer</dt>
        <dd>2026/01482-7</dd>
        <dd class="ksd-summary-list__actions">
          <a class="ds-link" href="#">
            Endre<span class="ds-sr-only"> saksnummer</span>
          </a>
        </dd>
      </div>
    </dl>
  </div>
</article>`,
  react: `<article className="ds-card">
  <h2 className="ds-heading ds-card__block" data-size="xs">
    Søknad om ledsagerbevis
  </h2>
  <div className="ds-card__block">
    <dl className="ksd-summary-list">
      <div>
        <dt>Navn</dt>
        <dd>Sarah Philips</dd>
        <dd className="ksd-summary-list__actions">
          <a className="ds-link" href="#">
            Endre<span className="ds-sr-only"> navn</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Fødselsnummer</dt>
        <dd>12345678901</dd>
        <dd className="ksd-summary-list__actions">
          <a className="ds-link" href="#">
            Endre<span className="ds-sr-only"> fødselsnummer</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Adresse</dt>
        <dd>Storgata 1, 0155 Oslo</dd>
        <dd className="ksd-summary-list__actions">
          <a className="ds-link" href="#">
            Endre<span className="ds-sr-only"> adresse</span>
          </a>
        </dd>
      </div>
      <div>
        <dt>Saksnummer</dt>
        <dd>2026/01482-7</dd>
        <dd className="ksd-summary-list__actions">
          <a className="ds-link" href="#">
            Endre<span className="ds-sr-only"> saksnummer</span>
          </a>
        </dd>
      </div>
    </dl>
  </div>
</article>`,
}
