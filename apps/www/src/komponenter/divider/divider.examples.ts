import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

// No Angular component: Angular uses the HTML
export const imports: Imports = {
  angular: `import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Divider, Paragraph } from '@ks-digital/designsystem-react'`,
}

const Divider = component({ html: 'hr.ds-divider', react: 'Divider' })
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

export const preview = () =>
  snippets(
    Paragraph({}, 'Søknaden ble sendt inn 12. mars.'),
    // React sets aria-hidden itself
    Divider({ 'aria-hidden': per({ html: 'true', angular: 'true' }) }),
    Paragraph({}, 'Du får svar innen tre uker.'),
  )
