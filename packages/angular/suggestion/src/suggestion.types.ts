export type SuggestionItem = { label: string; value: string }

/** Value of the `value` model and Angular signal forms. Always primitive. */
export type SuggestionValue = string | string[] | undefined

/** Accepted by `[selected]`; items and raw option values are both allowed. */
export type SuggestionSelectedInput =
  | SuggestionItem
  | SuggestionItem[]
  | string
  | string[]
  | null
  | undefined

/** Emitted by `(selectedChange)`. Always resolved items. */
export type SuggestionSelected = SuggestionItem | SuggestionItem[] | undefined

export type SuggestionFilterArgs = {
  index: number
  label: string
  text: string
  value: string
  optionElement: HTMLOptionElement
  input: HTMLInputElement
}

export type SuggestionFilter = (args: SuggestionFilterArgs) => boolean
