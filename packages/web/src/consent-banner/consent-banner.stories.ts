import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

type ConsentBannerArgs = {
  heading: string
  description: string
  linkText: string
  acceptLabel: string
  declineLabel: string
}

// prettier-ignore
const consentBanner = ({ heading, description, linkText, acceptLabel, declineLabel }: ConsentBannerArgs) => html`
<section class="ksd-consent-banner" aria-labelledby="samtykkebanner-tittel">
  <div class="ksd-consent-banner__content">
    <h2 class="ds-heading" data-size="md" id="samtykkebanner-tittel">${heading}</h2>
    <p class="ds-paragraph">
      ${description} <a class="ds-link" href="#personvern">${linkText}</a>
    </p>
    <form class="ksd-consent-banner__actions" method="post" action="/api/consent">
      <button class="ds-button" type="submit" name="action" value="accept">${acceptLabel}</button>
      <button class="ds-button" type="submit" name="action" value="decline">${declineLabel}</button>
    </form>
    <p class="ds-paragraph ksd-consent-banner__footnote" data-size="sm">
      <a class="ds-link" href="#nodvendig">Vi lagrer også nødvendig informasjon</a>
      som ikke kan velges bort. Dette gjør at nettsiden fungerer og er trygg.
    </p>
  </div>
</section>`

const meta: Meta<ConsentBannerArgs> = {
  title: 'Consent Banner',
  // Global layout is 'centered', which shrink-wraps the banner to its content width
  parameters: { layout: 'fullscreen' },
  args: {
    heading: 'Får vi samle informasjon om hvordan nettsiden brukes?',
    description:
      'Hvis du svarer ja, lagrer og analyserer vi informasjon som hjelper oss å forbedre nettsiden. Du kan når som helst endre valget ditt nederst på siden.',
    linkText: 'Mer om hva vi lagrer og hvorfor.',
    acceptLabel: 'Ja',
    declineLabel: 'Nei',
  },
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    linkText: { control: 'text' },
    acceptLabel: { control: 'text' },
    declineLabel: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<ConsentBannerArgs>

export const Preview: Story = {
  render: consentBanner,
}

export const SmalSkjerm: Story = {
  name: 'Smal skjerm',
  render: (args) =>
    html`<div style="max-inline-size: 22rem">${consentBanner(args)}</div>`,
}
