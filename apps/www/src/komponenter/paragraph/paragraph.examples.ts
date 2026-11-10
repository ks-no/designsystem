import { component, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export const paragraphSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type ParagraphArgs = {
  'data-variant'?: 'default' | 'long' | 'short'
  'data-size'?: (typeof paragraphSizes)[number]
  label: string
}

export const imports: Imports = {
  angular: `import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Paragraph } from '@ks-digital/designsystem-react'`,
}

// Angular has no inputs: data-size and data-variant are plain attributes
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
  reactProps: { 'data-variant': 'variant' },
})

const text =
  'Du kan søke om barnehageplass hele året. Hovedopptaket har søknadsfrist 1. mars, og du får svar innen utgangen av april. Plass tildeles etter alder og bosted.'

export const preview = ({ label, ...attrs }: ParagraphArgs) =>
  snippets(Paragraph(attrs, label))

export const variants = ({ 'data-size': size }: ParagraphArgs) =>
  snippets(
    Paragraph({ 'data-variant': 'long', 'data-size': size }, text),
    Paragraph(
      { 'data-variant': 'short', 'data-size': size },
      'Saksnummer 2025/1234. Sist oppdatert 12. mars.',
    ),
  )
