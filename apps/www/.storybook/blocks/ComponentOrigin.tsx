import { Heading } from '@storybook/addon-docs/blocks'
import { digdirUrl, useKsdParameters } from './ComponentHeader'

const REPO = 'https://github.com/ks-no/designsystem/tree/main'

interface Props {
  /** The stories module, or `'meta'` in a template */
  of: unknown
}

/** "Opphav": where the component comes from, and what KS has changed */
export function ComponentOrigin({ of }: Props) {
  const ksd = useKsdParameters(of)
  const changes = ksd.changes ?? []

  return (
    <>
      <Heading>Opphav</Heading>
      <div
        className="sb-unstyled"
        style={{ display: 'grid', gap: 'var(--ds-size-3)' }}
      >
        {ksd.origin === 'digdir' ? (
          <p className="ds-paragraph">
            Komponenten kommer fra{' '}
            {ksd.digdir ? (
              <a
                className="ds-link"
                href={digdirUrl(ksd.digdir)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Designsystemet
              </a>
            ) : (
              'Designsystemet'
            )}{' '}
            (Digdir) og bruker temaene til KS Digital.
            {changes.length === 0 && ' Ellers har vi ikke endret noe.'}
          </p>
        ) : (
          <p className="ds-paragraph">
            Komponenten er laget av KS Digital og fungerer med temaene og
            komponentene fra Designsystemet.
          </p>
        )}
        {changes.length > 0 && (
          <>
            <p className="ds-paragraph">
              {ksd.origin === 'digdir'
                ? 'Dette har KS endret eller lagt til:'
                : 'Verdt å vite:'}
            </p>
            <ul className="ds-list">
              {changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </>
        )}
        {ksd.source && (
          <p className="ds-paragraph" data-size="sm">
            <a
              className="ds-link"
              href={`${REPO}/${ksd.source}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Se kildekoden på GitHub
            </a>
          </p>
        )}
      </div>
    </>
  )
}
