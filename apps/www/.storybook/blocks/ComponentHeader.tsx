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

/**
 * Under the title: an "Utarbeidet av KS Digital" tag on our own components, and for components from
 * Designsystemet a pointer to designsystemet.no for guidelines. Designsystemet components
 * get no tag, the alert already says where they come from. The "Opphav" section at the
 * bottom has the details.
 */
export function ComponentHeader({ of }: Props) {
  const ksd = useKsdParameters(of)
  const ours = ksd.origin !== 'digdir'
  if (!ours && !ksd.digdir) return null

  return (
    <div
      className="sb-unstyled"
      style={{
        display: 'grid',
        gap: 'var(--ds-size-4)',
        justifyItems: 'start',
        marginBlockEnd: 'var(--ds-size-6)',
      }}
    >
      {ours && (
        // The KS support colour, not blue like the info alert on the other pages
        <span className="ds-tag" data-color="support1" data-size="sm">
          Utarbeidet av KS Digital
        </span>
      )}
      {ksd.digdir && (
        <div className="ds-alert" data-color="info">
          <p className="ds-paragraph">
            De fleste retningslinjene for bruk av denne komponenten står på
            designsystemet.no. Vi gjentar dem ikke her, for å unngå dobbel
            informasjon.
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
      )}
    </div>
  )
}
