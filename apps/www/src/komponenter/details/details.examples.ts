import { component, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type DetailsArgs = {
  'data-variant'?: 'default' | 'tinted'
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  summary: string
  content: string
}

export const imports: Imports = {
  angular: `import { Details } from '@ks-digital/designsystem-angular/details'`,
  react: `import { Details } from '@ks-digital/designsystem-react'`,
}

const Details = component({
  html: 'details.ds-details',
  angular: 'details[ksd-details]',
  react: 'Details',
  reactProps: { 'data-variant': 'variant' },
})
// Angular uses the native <summary> and <div>: the CSS expects them as direct children
const Summary = component({ html: 'summary', react: 'Details.Summary' })
const Content = component({ html: 'div', react: 'Details.Content' })

export const preview = ({ summary, content, ...attrs }: DetailsArgs) =>
  snippets(Details(attrs, Summary({}, summary), Content({}, content)))

const questions = [
  {
    summary: 'Hvem kan søke om barnehageplass?',
    content:
      'Alle barn som bor i kommunen, kan søke. Barnet må ha fylt ett år innen august.',
  },
  {
    summary: 'Hva koster en barnehageplass?',
    content:
      'Maksprisen er fastsatt av Stortinget. Familier med lav inntekt kan søke om redusert pris.',
  },
  {
    summary: 'Når får jeg svar?',
    content: 'Du får svar på søknaden innen utgangen av april.',
  },
]

export const several = (args: DetailsArgs) => {
  const attrs = {
    'data-variant': args['data-variant'],
    'data-size': args['data-size'],
    'data-color': args['data-color'],
  }
  return snippets(
    ...questions.map((q) =>
      Details(attrs, Summary({}, q.summary), Content({}, q.content)),
    ),
  )
}
