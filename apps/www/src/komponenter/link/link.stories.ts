import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { commonArgTypes } from '../../../.storybook/args'
import { renderExample } from '../../../.storybook/render'
import * as examples from './link.examples'

type LinkArgs = {
  'data-size'?: string
  'data-color'?: string
  href: string
  label: string
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'link',
  imports: examples.imports,
}

const meta: Meta<LinkArgs> = {
  title: 'Komponenter/Link',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  argTypes: commonArgTypes,
  render: renderExample,
}
export default meta

type Story = StoryObj<LinkArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  args: { label: 'kommunale tjenester', href: '#' },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
  },
  render: (a) =>
    html`<a
      class="ds-link"
      href=${a.href}
      data-size=${ifDefined(a['data-size'])}
      data-color=${ifDefined(a['data-color'])}
      >${a.label}</a
    >`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const ITekst: Story = {
  name: 'I tekst',
  parameters: { snippets: examples.inText },
}
/**
 * Pakk teksten inn i en `span`, så får ikonet riktig avstand til teksten, enten det står
 * foran eller bak.
 */
export const MedIkon: Story = {
  name: 'Med ikon',
  decorators: (story) =>
    html`<div
      style="display:flex;flex-direction:column;align-items:start;gap:var(--ds-size-2)"
    >
      ${story()}
    </div>`,
  parameters: {
    snippets: examples.withIcon,
    exampleImports: examples.withIconImports,
  },
}
/** En lenke med bare ikon må ha en `aria-label` som beskriver hvor lenken fører. */
export const BareIkon: Story = {
  name: 'Bare ikon',
  parameters: {
    snippets: examples.iconOnly,
    exampleImports: examples.iconOnlyImports,
  },
}
/** Lange lenketekster brytes over flere linjer. */
export const LangLenketekst: Story = {
  name: 'Lang lenketekst',
  decorators: (story) => html`<div style="max-width:20rem">${story()}</div>`,
  parameters: { snippets: examples.longText },
}
