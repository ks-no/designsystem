import type {
  SuggestionFormModelValue,
  SuggestionFormValue,
  SuggestionItem,
  SuggestionValue,
} from './suggestion.types'

export const isSuggestionItem = (
  value: SuggestionItem | string | null | undefined,
): value is SuggestionItem =>
  typeof value === 'object' &&
  value !== null &&
  'label' in value &&
  'value' in value

const sanitizeValues = (
  values: SuggestionFormModelValue,
): Array<SuggestionItem | string> =>
  values == null ? [] : Array.isArray(values) ? values : [values]

export const sanitizeItems = (
  values: SuggestionFormModelValue,
  optionItems: SuggestionItem[] = [],
): SuggestionItem[] =>
  sanitizeValues(values).map((value) => {
    if (isSuggestionItem(value)) return value

    const optionItem = optionItems.find((item) => item.value === value)
    return optionItem ?? { label: value, value }
  })

export const toSuggestionValue = (
  values: SuggestionFormModelValue,
  optionItems: SuggestionItem[] = [],
): SuggestionValue => {
  if (values == null) return undefined

  const items = sanitizeItems(values, optionItems)
  return Array.isArray(values) ? items : items[0]
}

export const usesItemValues = (values: SuggestionFormModelValue) =>
  sanitizeValues(values).some(isSuggestionItem)

const toItem = (data: HTMLDataElement): SuggestionItem => ({
  label: data.textContent?.trim() || data.value,
  value: data.value,
})

export const nextSelected = (
  data: HTMLDataElement,
  previous: SuggestionFormModelValue,
  multiple: boolean,
  useItemValues: boolean,
): SuggestionFormValue => {
  const item = toItem(data)

  if (!multiple) {
    return data.isConnected ? undefined : useItemValues ? item : item.value
  }

  if (useItemValues) {
    const previousItems = sanitizeItems(previous)

    return data.isConnected
      ? previousItems.filter((value) => value.value !== item.value)
      : [...previousItems, item]
  }

  const previousValues = sanitizeValues(previous).map((value) =>
    isSuggestionItem(value) ? value.value : value,
  )

  return data.isConnected
    ? previousValues.filter((value) => value !== item.value)
    : [...previousValues, item.value]
}
