export type SuggestionItem = { label: string; value: string }

export type SuggestionModelValue =
  | SuggestionItem
  | SuggestionItem[]
  | null
  | undefined
