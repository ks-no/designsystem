import type { SuggestionItem, SuggestionModelValue } from './suggestion.types'

export const sanitizeItems = (
  values: SuggestionModelValue,
): SuggestionItem[] =>
  !values ? [] : Array.isArray(values) ? values : [values]

const toItem = (data: HTMLDataElement): SuggestionItem => ({
  label: data.textContent?.trim() || data.value,
  value: data.value,
})

export const nextSelected = (
  data: HTMLDataElement,
  previous: SuggestionModelValue,
  multiple: boolean,
): SuggestionItem | SuggestionItem[] | null => {
  const item = toItem(data)

  if (!multiple) {
    return data.isConnected ? null : item
  }

  const prevItems = sanitizeItems(previous)
  return data.isConnected
    ? prevItems.filter(({ value }) => value !== item.value)
    : [...prevItems, item]
}
