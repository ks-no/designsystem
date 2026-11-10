import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { SystemBannerArgs } from './system-banner.examples'
import * as examples from './system-banner.examples'

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
  render: (args, { parameters }) => parameters['snippets'](args).html,
}

export default meta

type Story = StoryObj<SystemBannerArgs>

export const Preview: Story = {
  parameters: { snippets: examples.preview },
}

export const Varianter: Story = {
  parameters: { snippets: examples.variants },
}

export const LangTekst: Story = {
  name: 'Lang tekst',
  args: {
    text: 'Vi bytter ut fagsystemet i helgen, og tjenesten er derfor utilgjengelig fra fredag klokken 16 til mandag klokken 08. Søknader som allerede er sendt inn blir behandlet som vanlig, og du trenger ikke gjøre noe selv.',
  },
  parameters: { snippets: examples.preview },
}

export const SmalSkjerm: Story = {
  name: 'Smal skjerm',
  parameters: { snippets: examples.preview },
  decorators: [
    (story) => `<div style="max-inline-size: 22rem">${story()}</div>`,
  ],
}
