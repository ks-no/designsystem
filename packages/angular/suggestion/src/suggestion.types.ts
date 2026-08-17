export type SuggestionItem = { label: string; value: string }

export type SuggestionValue = SuggestionItem | SuggestionItem[] | undefined

export type SuggestionPrimitiveValue = string | string[] | undefined

export type SuggestionFormValue = SuggestionPrimitiveValue | SuggestionValue

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

export type SuggestionFormModelValue = SuggestionFormValue | null | undefined
