import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { HtmlSnippets } from '@internal/storybook/snippets'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, render, type TemplateResult } from 'lit'
import { guard } from 'lit/directives/guard.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { sizes } from '../../../.storybook/args'
import { parseExample } from '../../../.storybook/render'
import * as examples from './error-summary.examples'

type ErrorSummaryArgs = {
  'data-size'?: string
  heading: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'error-summary',
  changes: [
    'Angular-komponenten flytter ikke fokus av seg selv. Kall focus() på komponenten når du viser den.',
  ],
  source: 'packages/angular/error-summary/src',
  imports: examples.imports,
}

/**
 * ds-error-summary moves focus to itself when it's added to the page. That's right
 * in an app, but here it would pull focus away from the docs and the Controls panel.
 * Turn it off on these instances only, before they're connected; the code shown is unchanged.
 */
const withoutAutofocus = (root: ParentNode) => {
  root
    .querySelectorAll<HTMLElement>('ds-error-summary')
    .forEach((element) => (element.focus = () => undefined))
  return root
}

/** Renders a lit template off the page, so the focus can be turned off first */
const renderDetached = (template: TemplateResult) => {
  const container = document.createElement('div')
  render(template, container)
  withoutAutofocus(container)
  const fragment = document.createDocumentFragment()
  fragment.append(...container.childNodes)
  return fragment
}

const meta: Meta<ErrorSummaryArgs> = {
  title: 'Komponenter/Error Summary',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
  },
  // Like renderExample: guard parses again for each render, so a decorator's lit
  // template doesn't hand Storybook's source render the same (then emptied) fragment
  render: (_, context) =>
    html`${guard([(context.parameters['snippets'] as HtmlSnippets).html], () =>
      withoutAutofocus(parseExample(context)),
    )}`,
}
export default meta

type Story = StoryObj<ErrorSummaryArgs>

// Each link points to the field with the error, with the same text as its validation message
const errors = [
  { id: 'fodselsdato', message: 'Fødselsdato kan ikke være etter år 2005' },
  { id: 'telefon', message: 'Telefonnummer kan bare inneholde siffer' },
  { id: 'epost', message: 'E-post må være en gyldig e-postadresse' },
]

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { heading: 'For å gå videre må du rette opp disse feilene:' },
  argTypes: {
    heading: { control: 'text' },
  },
  render: (a) =>
    renderDetached(
      html`<ds-error-summary
        class="ds-error-summary"
        data-size=${ifDefined(a['data-size'])}
      >
        <h2 class="ds-heading">${a.heading}</h2>
        <ul class="ds-list">
          ${errors.map(
            ({ id, message }) =>
              html`<li>
                <a class="ds-link" href="#${id}" data-color="neutral">
                  ${message}
                </a>
              </li>`,
          )}
        </ul>
      </ds-error-summary>`,
    ),
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const MedSkjema: Story = {
  name: 'Med skjema',
  parameters: { snippets: examples.withForm },
  decorators: [
    // Submitting would leave the docs page; the code shown is unchanged
    (story) =>
      html`<div
        style="max-inline-size: 30rem"
        @submit=${(event: SubmitEvent) => event.preventDefault()}
      >
        ${story()}
      </div>`,
  ],
}
