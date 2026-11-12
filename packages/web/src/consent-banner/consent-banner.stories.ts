import { renderExample } from '@internal/docs/render'
import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import * as examples from './consent-banner.examples'

type ConsentBannerArgs = {
  heading: string
  description: string
  linkText: string
  acceptLabel: string
  declineLabel: string
}

const ksd: KsdDocsParameters = {
  origin: 'ks',
  // The component is CSS only, so link to the stylesheet
  source: 'packages/themes/src/ksd/consent-banner.css',
}

const meta: Meta<ConsentBannerArgs> = {
  title: 'Consent Banner',
  parameters: {
    ksd,
    // Global layout is 'centered', which shrink-wraps the banner to its content width
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'none' } },
  },
  render: renderExample,
}

export default meta

type Story = StoryObj<ConsentBannerArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
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
  render: (a) =>
    html`<section
      class="ksd-consent-banner"
      aria-labelledby="samtykkebanner-tittel"
    >
      <div class="ksd-consent-banner__content">
        <h2 class="ds-heading" data-size="md" id="samtykkebanner-tittel">
          ${a.heading}
        </h2>
        <p class="ds-paragraph">
          ${a.description}
          <a class="ds-link" href="#personvern">${a.linkText}</a>
        </p>
        <!-- Accept and decline must look the same: same variant and size -->
        <div class="ksd-consent-banner__actions">
          <button class="ds-button" type="button">${a.acceptLabel}</button>
          <button class="ds-button" type="button">${a.declineLabel}</button>
        </div>
        <p class="ds-paragraph ksd-consent-banner__footnote" data-size="sm">
          <a class="ds-link" href="#nodvendig"
            >Vi lagrer også nødvendig informasjon</a
          >
          som ikke kan velges bort. Dette gjør at nettsiden fungerer og er
          trygg.
        </p>
      </div>
    </section>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

export const SmalSkjerm: Story = {
  ...controls,
  name: 'Smal skjerm',
  parameters: { snippets: examples.preview },
  decorators: [
    (story) => html`<div style="max-inline-size: 22rem">${story()}</div>`,
  ],
}
