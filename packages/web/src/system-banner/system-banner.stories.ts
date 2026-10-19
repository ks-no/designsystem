import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'

type SystemBannerArgs = {
  color: 'info' | 'warning' | 'success' | 'danger'
  text: string
  linkText: string
  closable: boolean
}

// prettier-ignore
const systemBanner = ({ color, text, linkText, closable }: SystemBannerArgs) => html`
<div class="ksd-system-banner" data-color=${color}>
  <div class="ksd-system-banner__content">
    <p class="ds-paragraph ksd-system-banner__text">
      ${text}
      ${linkText ? html`<a class="ds-link" href="#support">${linkText}</a>` : nothing}
    </p>
    ${closable ? html`<button class="ds-button ksd-system-banner__close" type="button" data-variant="tertiary" data-icon aria-label="Lukk melding"></button>` : nothing}
  </div>
</div>`

const meta: Meta<SystemBannerArgs> = {
  title: 'System Banner',
  // Global layout is 'centered', which shrink-wraps the banner to its content width
  parameters: { layout: 'fullscreen' },
  args: {
    color: 'danger',
    prefix: 'Feil:',
    text: 'Alle systemene våre er nede nå, men vi jobber med å få løst opp i floken.',
    linkText: 'Kontakt support',
    closable: true,
  },
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['info', 'warning', 'success', 'danger'],
    },
    prefix: { control: 'text' },
    text: { control: 'text' },
    linkText: { control: 'text' },
    closable: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<SystemBannerArgs>

export const Preview: Story = {
  render: systemBanner,
}

export const Varianter: Story = {
  render: (args) => html`
    ${systemBanner({
      ...args,
      color: 'danger',
      prefix: 'Feil:',
      text: 'Alle systemene våre er nede nå, men vi jobber med å få løst opp i floken.',
    })}
    ${systemBanner({
      ...args,
      color: 'warning',
      prefix: 'Advarsel:',
      text: 'Vi har litt teknisk krøll akkurat nå, men jobber med å få løst opp i floken.',
    })}
    ${systemBanner({
      ...args,
      color: 'success',
      prefix: '',
      text: 'Alle systemene våre er oppe og går!',
      linkText: '',
    })}
    ${systemBanner({
      ...args,
      color: 'info',
      prefix: '',
      text: 'Her kommer en informativ statusoppdatering fra systemet.',
      linkText: 'Sjekk mer opp i dette her',
    })}
  `,
}

export const LangTekst: Story = {
  name: 'Lang tekst',
  args: {
    text: 'Vi bytter ut fagsystemet i helgen, og tjenesten er derfor utilgjengelig fra fredag klokken 16 til mandag klokken 08. Søknader som allerede er sendt inn blir behandlet som vanlig, og du trenger ikke gjøre noe selv.',
  },
  render: systemBanner,
}

export const SmalSkjerm: Story = {
  name: 'Smal skjerm',
  render: (args) =>
    html`<div style="max-inline-size: 22rem">${systemBanner(args)}</div>`,
}
