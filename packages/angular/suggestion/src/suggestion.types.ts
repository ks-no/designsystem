export type SuggestionItem = { label: string; value: string }

export type SuggestionValue = SuggestionItem | SuggestionItem[] | undefined

export type SuggestionFilterArgs = {
  index: number
  label: string
  text: string
  value: string
  optionElement: HTMLOptionElement
  input: HTMLInputElement
}

export type SuggestionFilter = (args: SuggestionFilterArgs) => boolean

export type SuggestionModelValue = SuggestionValue | null | undefined
