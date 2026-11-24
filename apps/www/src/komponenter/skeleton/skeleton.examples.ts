import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Skeleton } from '@ks-digital/designsystem-angular/skeleton'`,
  react: `import { Skeleton } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<span
  class="ds-skeleton"
  data-variant="rectangle"
  style="width: 240px; height: 120px"
  aria-hidden="true"
></span>`,
  angular: `<ksd-skeleton data-variant="rectangle" style="width: 240px; height: 120px"></ksd-skeleton>`,
  react: `<Skeleton variant="rectangle" width={240} height={120} />`,
}

export const loading: Snippets = {
  html: `<span
  class="ds-skeleton"
  data-variant="circle"
  style="width: 48px; height: 48px"
  aria-hidden="true"
></span>
<span class="ds-skeleton" data-variant="text" aria-hidden="true">
  Søknad om barnehageplass
</span>
<span class="ds-skeleton" data-variant="text" aria-hidden="true">
  Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.
</span>
<span
  class="ds-skeleton"
  data-variant="rectangle"
  style="width: 240px; height: 120px"
  aria-hidden="true"
></span>`,
  angular: `<ksd-skeleton data-variant="circle" style="width: 48px; height: 48px"></ksd-skeleton>
<ksd-skeleton data-variant="text">Søknad om barnehageplass</ksd-skeleton>
<ksd-skeleton data-variant="text">
  Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.
</ksd-skeleton>
<ksd-skeleton data-variant="rectangle" style="width: 240px; height: 120px"></ksd-skeleton>`,
  react: `<>
  <Skeleton variant="circle" width={48} height={48} />
  <Skeleton variant="text">Søknad om barnehageplass</Skeleton>
  <Skeleton variant="text">
    Hovedopptaket har søknadsfrist 1. mars. Du får svar innen utgangen av april.
  </Skeleton>
  <Skeleton variant="rectangle" width={240} height={120} />
</>`,
}
