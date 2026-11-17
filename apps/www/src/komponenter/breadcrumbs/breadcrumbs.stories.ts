import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './breadcrumbs.examples'

type BreadcrumbsArgs = {
  'aria-label': string
  'data-size'?: string
  'data-color'?: string
  /** The "back" link shown on narrow screens */
  back?: boolean
  /** The full trail, shown when there is room */
  trail?: boolean
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'breadcrumbs',
  imports: examples.imports,
}

const meta: Meta<BreadcrumbsArgs> = {
  title: 'Komponenter/Breadcrumbs',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<BreadcrumbsArgs>

const trail = ['Hjem', 'Tjenester', 'Søknader', 'Søknad om barnehageplass']

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { 'aria-label': 'Du er her:', back: true, trail: true },
  argTypes: {
    'aria-label': { control: 'text' },
    back: { control: 'boolean' },
    trail: { control: 'boolean' },
  },
  render: (a) =>
    html`<ds-breadcrumbs
      class="ds-breadcrumbs"
      aria-label=${a['aria-label']}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
    >
      ${
        a.back
          ? html`<a class="ds-link" href="#" aria-label="Tilbake til Søknader"
              >Søknader</a
            >`
          : nothing
      }
      ${
        a.trail
          ? html`<ol>
              ${trail.map(
                (page) =>
                  html`<li><a class="ds-link" href="#">${page}</a></li>`,
              )}
            </ol>`
          : nothing
      }
    </ds-breadcrumbs>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}

export const ListOnly: Story = {
  ...controls,
  name: 'Bare liste',
  args: { ...controls.args, back: false },
  parameters: { snippets: examples.listOnly },
}

export const BackOnly: Story = {
  ...controls,
  name: 'Bare tilbake-lenke',
  args: { ...controls.args, trail: false },
  parameters: { snippets: examples.backOnly },
}
