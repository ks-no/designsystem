import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Link } from '@ks-digital/designsystem-angular/link'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Link, Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<a class="ds-link" href="#">kommunale tjenester</a>`,
  angular: `<a ksd-link href="#">kommunale tjenester</a>`,
  react: `<Link href="#">kommunale tjenester</Link>`,
}

export const inText: Snippets = {
  html: `<p class="ds-paragraph">
  Les mer om <a class="ds-link" href="#">kommunale tjenester</a>.
</p>`,
  angular: `<p ksd-paragraph>
  Les mer om <a ksd-link href="#">kommunale tjenester</a>.
</p>`,
  react: `<Paragraph>
  Les mer om <Link href="#">kommunale tjenester</Link>.
</Paragraph>`,
}
