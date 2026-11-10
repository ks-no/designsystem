import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type AlertArgs = {
  'data-color'?: 'info' | 'success' | 'warning' | 'danger'
  'data-size'?: 'sm' | 'md' | 'lg'
  heading: string
  body: string
}

export const imports: Imports = {
  angular: `import { Alert } from '@ks-digital/designsystem-angular/alert'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Alert, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
}

const Alert = component({
  html: 'div.ds-alert',
  angular: 'ksd-alert',
  react: 'Alert',
})
const Heading = component({
  html: 'h2.ds-heading',
  angular: 'h2[ksd-heading]',
  react: 'Heading',
})
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

export const preview = ({ heading, body, ...attrs }: AlertArgs) =>
  snippets(
    Alert(
      attrs,
      Heading({ level: per({ react: 2 }), 'data-size': 'xs' }, heading),
      Paragraph({}, body),
    ),
  )

export const textOnly = ({ body, ...args }: AlertArgs) =>
  snippets(
    Alert(
      { 'data-color': args['data-color'], 'data-size': args['data-size'] },
      body,
    ),
  )
