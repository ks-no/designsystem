import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { ConsentBannerArgs } from './consent-banner.examples'
import * as examples from './consent-banner.examples'

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
  render: (args, { parameters }) => parameters['snippets'](args).html,
}

export default meta

type Story = StoryObj<ConsentBannerArgs>

export const Preview: Story = {
  parameters: { snippets: examples.preview },
}

export const SmalSkjerm: Story = {
  name: 'Smal skjerm',
  parameters: { snippets: examples.preview },
  decorators: [
    (story) => `<div style="max-inline-size: 22rem">${story()}</div>`,
  ],
}
