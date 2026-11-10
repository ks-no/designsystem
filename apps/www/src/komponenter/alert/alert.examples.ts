import {
  attrs,
  props,
  text,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

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

export const preview = ({ heading, body, ...a }: AlertArgs): Snippets => ({
  html: `<div class="ds-alert"${attrs(a)}>
  <h2 class="ds-heading" data-size="xs">${text(heading)}</h2>
  <p class="ds-paragraph">${text(body)}</p>
</div>`,
  angular: `<ksd-alert${attrs(a)}>
  <h2 ksd-heading data-size="xs">${text(heading)}</h2>
  <p ksd-paragraph>${text(body)}</p>
</ksd-alert>`,
  react: `<Alert${props(a)}>
  <Heading level={2} data-size="xs">${text(heading)}</Heading>
  <Paragraph>${text(body)}</Paragraph>
</Alert>`,
})

export const textOnly = (args: AlertArgs): Snippets => {
  const a = { 'data-color': args['data-color'], 'data-size': args['data-size'] }
  const body = args.body
  return {
    html: `<div class="ds-alert"${attrs(a)}>${text(body)}</div>`,
    angular: `<ksd-alert${attrs(a)}>${text(body)}</ksd-alert>`,
    react: `<Alert${props(a)}>${text(body)}</Alert>`,
  }
}
