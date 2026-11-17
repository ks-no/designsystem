import type { HtmlSnippets } from '@internal/storybook/snippets'

export const preview: HtmlSnippets = {
  html: `<section class="ksd-consent-banner" aria-labelledby="samtykkebanner-tittel">
  <div class="ksd-consent-banner__content">
    <h2 class="ds-heading" data-size="md" id="samtykkebanner-tittel">
      Får vi samle informasjon om hvordan nettsiden brukes?
    </h2>
    <p class="ds-paragraph">
      Hvis du svarer ja, lagrer og analyserer vi informasjon som hjelper oss å forbedre nettsiden. Du kan når som helst endre valget ditt nederst på siden.
      <a class="ds-link" href="#personvern">Mer om hva vi lagrer og hvorfor.</a>
    </p>
    <div class="ksd-consent-banner__actions">
      <button class="ds-button" type="button">Ja</button>
      <button class="ds-button" type="button">Nei</button>
    </div>
    <p class="ds-paragraph ksd-consent-banner__footnote" data-size="sm">
      <a class="ds-link" href="#nodvendig">Vi lagrer også nødvendig informasjon</a>
      som ikke kan velges bort. Dette gjør at nettsiden fungerer og er trygg.
    </p>
  </div>
</section>`,
}
