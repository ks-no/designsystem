import { renderExample } from '@internal/docs/render'
import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import * as examples from './system-banner.examples'

type SystemBannerArgs = {
  color: 'info' | 'warning' | 'success' | 'danger'
  text: string
  linkText: string
  closable: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'ks',
  // The component is CSS only, so link to the stylesheet
  source: 'packages/themes/src/ksd/system-banner.css',
}

const meta: Meta<SystemBannerArgs> = {
  title: 'System Banner',
  parameters: {
    ksd,
    // Global layout is 'centered', which shrink-wraps the banner to its content width
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'none' } },
  },
  render: renderExample,
}

export default meta

type Story = StoryObj<SystemBannerArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: {
    color: 'danger',
    text: 'Alle systemene våre er nede nå, men vi jobber med å få løst opp i floken.',
    linkText: 'Kontakt support',
    closable: true,
  },
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['info', 'warning', 'success', 'danger'],
    },
    text: { control: 'text' },
    linkText: { control: 'text' },
    closable: { control: 'boolean' },
  },
  render: (a) =>
    html`<div class="ksd-system-banner" data-color=${a.color}>
      <div class="ksd-system-banner__content">
        <p class="ds-paragraph ksd-system-banner__text">
          ${a.text}
          ${
            a.linkText
              ? html`<a class="ds-link" href="#support">${a.linkText}</a>`
              : nothing
          }
        </p>
        ${
          a.closable
            ? // Optional, and a no-op: you add the closing behaviour yourself
              html`<button
                class="ds-button ksd-system-banner__close"
                type="button"
                data-variant="tertiary"
                data-icon
                aria-label="Lukk melding"
              ></button>`
            : nothing
        }
      </div>
    </div>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

export const Varianter: Story = {
  parameters: { snippets: examples.variants },
}

export const LangTekst: Story = {
  ...controls,
  name: 'Lang tekst',
  args: {
    ...controls.args,
    text: 'Vi bytter ut fagsystemet i helgen, og tjenesten er derfor utilgjengelig fra fredag klokken 16 til mandag klokken 08. Søknader som allerede er sendt inn blir behandlet som vanlig, og du trenger ikke gjøre noe selv.',
  },
  parameters: { snippets: examples.langTekst },
}

export const SmalSkjerm: Story = {
  ...controls,
  name: 'Smal skjerm',
  parameters: { snippets: examples.smalSkjerm },
  decorators: [
    (story) => html`<div style="max-inline-size: 22rem">${story()}</div>`,
  ],
}
