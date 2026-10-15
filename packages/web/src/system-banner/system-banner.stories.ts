import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import '../dismiss'

type SystemBannerArgs = {
  color: 'info' | 'warning' | 'success' | 'danger'
  prefix: string
  text: string
  linkText: string
  closable: boolean
}

// prettier-ignore
const systemBanner = (id: string, { color, prefix, text, linkText, closable }: SystemBannerArgs) => html`
<div class="ksd-system-banner" id=${id} data-color=${color}>
  <div class="ksd-system-banner__content">
    <p class="ds-paragraph ksd-system-banner__text">
      ${prefix ? html`<span class="ds-sr-only">${prefix}</span> ` : nothing}${text}
      ${linkText ? html`<a class="ds-link" href="#support">${linkText}</a>` : nothing}
    </p>
    ${closable ? html`<button class="ds-button ksd-system-banner__close" type="button" data-variant="tertiary" data-icon data-ksd-dismiss=${id} aria-label="Lukk melding"></button>` : nothing}
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
  render: (args) => systemBanner('systembanner-preview', args),
}

export const Varianter: Story = {
  render: (args) => html`
    ${systemBanner('systembanner-danger', {
      ...args,
      color: 'danger',
      prefix: 'Feil:',
      text: 'Alle systemene våre er nede nå, men vi jobber med å få løst opp i floken.',
    })}
    ${systemBanner('systembanner-warning', {
      ...args,
      color: 'warning',
      prefix: 'Advarsel:',
      text: 'Vi har litt teknisk krøll akkurat nå, men jobber med å få løst opp i floken.',
    })}
    ${systemBanner('systembanner-success', {
      ...args,
      color: 'success',
      prefix: '',
      text: 'Alle systemene våre er oppe og går!',
      linkText: '',
    })}
    ${systemBanner('systembanner-info', {
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
  render: (args) => systemBanner('systembanner-lang', args),
}

export const SmalSkjerm: Story = {
  name: 'Smal skjerm',
  render: (args) =>
    html`<div style="max-inline-size: 22rem">
      ${systemBanner('systembanner-smal', args)}
    </div>`,
}
