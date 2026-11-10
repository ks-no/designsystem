/** Shared by the www docs blocks and component stories in any package */
import type { Imports } from './snippets'

/** One row in the Angular API table */
export interface AngularApiEntry {
  name: string
  kind: 'input' | 'output' | 'model'
  type: string
  default?: string
  description: string
}

/** `parameters.ksd` on www component stories */
export interface KsdDocsParameters {
  /** Where the component comes from: Designsystemet (Digdir) or KS Digital */
  origin: 'digdir' | 'ks'
  /** Slug on designsystemet.no, e.g. `button`. Digdir components only. */
  digdir?: string
  /** What KS has changed or added, shown under "Opphav". Leave out when nothing. */
  changes?: string[]
  /** Path to the source in this repo, e.g. `packages/web/src/summary-list` */
  source?: string
  /** Imports/registration shown above the code, per framework */
  imports?: Imports
  /** Inputs/outputs of the Angular component, for components with Angular-specific behaviour */
  angularApi?: AngularApiEntry[]
}
