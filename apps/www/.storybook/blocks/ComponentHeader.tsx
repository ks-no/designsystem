import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import { useOf } from '@storybook/addon-docs/blocks'

interface Props {
  /** The stories module (`import * as Stories from './x.stories'`), or `'meta'` in a template */
  of: unknown
}

export function useKsdParameters(of: unknown): KsdDocsParameters {
  const { preparedMeta } = useOf(of as Parameters<typeof useOf>[0], ['meta'])
  const ksd = preparedMeta.parameters['ksd'] as KsdDocsParameters | undefined
  if (!ksd) throw new Error('Docs block: meta has no parameters.ksd')
  return ksd
}

export const digdirUrl = (slug: string) =>
  `https://designsystemet.no/no/components/docs/${slug}/overview`

/** Points to designsystemet.no for guidelines, for components from Designsystemet */
export function ComponentHeader({ of }: Props) {
  const ksd = useKsdParameters(of)
  if (!ksd.digdir) return null

  return (
    <div
      className="sb-unstyled ds-alert"
      data-color="info"
      style={{ marginBlockEnd: 'var(--ds-size-6)' }}
    >
      <p className="ds-paragraph">
        De fleste retningslinjene for bruk står på designsystemet.no. Vi gjentar
        dem ikke her, for å unngå dobbel informasjon.
      </p>
      <a
        className="ds-link"
        href={digdirUrl(ksd.digdir)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Les dokumentasjonen på designsystemet.no
      </a>
    </div>
  )
}
