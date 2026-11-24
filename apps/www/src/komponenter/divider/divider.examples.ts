import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Divider, Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<p class="ds-paragraph">Søknaden ble sendt inn 12. mars.</p>
<hr class="ds-divider" aria-hidden="true" />
<p class="ds-paragraph">Du får svar innen tre uker.</p>`,
  angular: `<p ksd-paragraph>Søknaden ble sendt inn 12. mars.</p>
<hr class="ds-divider" aria-hidden="true" />
<p ksd-paragraph>Du får svar innen tre uker.</p>`,
  react: `<>
  <Paragraph>Søknaden ble sendt inn 12. mars.</Paragraph>
  <Divider />
  <Paragraph>Du får svar innen tre uker.</Paragraph>
</>`,
}
