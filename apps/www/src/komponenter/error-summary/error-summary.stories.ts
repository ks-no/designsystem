import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { ErrorSummaryArgs } from './error-summary.examples'
import * as examples from './error-summary.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'error-summary',
  changes: [
    'Angular-komponenten flytter ikke fokus av seg selv. Kall focus() på komponenten når du viser den.',
  ],
  source: 'packages/angular/error-summary/src',
  imports: examples.imports,
}

const meta: Meta<ErrorSummaryArgs> = {
  title: 'Komponenter/Error Summary',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: { heading: 'For å gå videre må du rette opp disse feilene:' },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    heading: { control: 'text' },
  },
  render: (args, { parameters }) => {
    const template = document.createElement('template')
    template.innerHTML = parameters['snippets'](args).html
    // ds-error-summary moves focus to itself when it's added to the page. That's right
    // in an app, but here it would pull focus away from the docs and the Controls panel.
    // Turn it off on this instance only, before it's connected; the code shown is unchanged.
    template.content
      .querySelectorAll<HTMLElement>('ds-error-summary')
      .forEach((element) => (element.focus = () => undefined))
    return template.content
  },
}
export default meta

type Story = StoryObj<ErrorSummaryArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
