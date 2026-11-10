import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type ErrorSummaryArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  heading: string
}

export const imports: Imports = {
  html: `// Registrerer <ds-error-summary>, én gang i applikasjonen\nimport '@ks-digital/designsystem-web'`,
  angular: `import { ErrorSummary } from '@ks-digital/designsystem-angular/error-summary'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import { ErrorSummary } from '@ks-digital/designsystem-react'`,
}

const ErrorSummary = component({
  html: 'ds-error-summary.ds-error-summary',
  angular: 'div[ksd-error-summary]',
  react: 'ErrorSummary',
})
const Heading = component({
  html: 'h2.ds-heading',
  angular: 'h2[ksd-heading]',
  react: 'ErrorSummary.Heading',
})
// No list component in Angular: plain HTML there
const List = component({ html: 'ul.ds-list', react: 'ErrorSummary.List' })
const Item = component({ html: 'li', react: 'ErrorSummary.Item' })
const Link = component({
  html: 'a.ds-link',
  angular: 'a[ksd-link]',
  react: 'ErrorSummary.Link',
})

// Each link points to the field with the error, with the same text as its validation message
const errors = [
  { id: 'fodselsdato', message: 'Fødselsdato kan ikke være etter år 2005' },
  { id: 'telefon', message: 'Telefonnummer kan bare inneholde siffer' },
  { id: 'epost', message: 'E-post må være en gyldig e-postadresse' },
]

export const preview = ({ heading, ...attrs }: ErrorSummaryArgs) =>
  snippets(
    ErrorSummary(
      attrs,
      Heading({}, heading),
      List(
        {},
        ...errors.map(({ id, message }) =>
          Item(
            {},
            Link(
              {
                href: `#${id}`,
                // ErrorSummary.Link sets data-color="neutral" itself in React
                'data-color': per({ html: 'neutral', angular: 'neutral' }),
              },
              message,
            ),
          ),
        ),
      ),
    ),
  )
