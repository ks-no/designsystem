import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import { useOf } from '@storybook/addon-docs/blocks'

const KIND = { input: 'Input', output: 'Output', model: 'Model' } as const

interface Props {
  /** The stories module, or `'meta'` inside a docs template */
  of: unknown
}

/** Inputs/outputs of the Angular component, from `parameters.ksd.angularApi` */
export function AngularApi({ of }: Props) {
  const { preparedMeta } = useOf(of as Parameters<typeof useOf>[0], ['meta'])
  const api = (preparedMeta.parameters['ksd'] as KsdDocsParameters | undefined)
    ?.angularApi
  if (!api?.length) return null

  return (
    <div className="sb-unstyled" style={{ overflowX: 'auto' }}>
      <table className="ds-table" data-size="sm" data-border>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Type</th>
            <th>Standard</th>
            <th>Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          {api.map((entry) => (
            <tr key={entry.name}>
              <td>
                <code>{entry.name}</code>
                <br />
                <span className="ds-paragraph" data-size="xs">
                  {KIND[entry.kind]}
                </span>
              </td>
              <td>
                <code>{entry.type}</code>
              </td>
              <td>{entry.default ? <code>{entry.default}</code> : '–'}</td>
              <td>{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
