import type {
  SuggestionItem,
  SuggestionSelected,
  SuggestionSelectedInput,
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
  values: SuggestionSelectedInput,
): Array<SuggestionItem | string> =>
  values == null ? [] : Array.isArray(values) ? values : [values]

const toValues = (value: SuggestionValue): string[] =>
  value == null ? [] : Array.isArray(value) ? value : [value]

/** Option labels keyed by option value, learned from options and selections. */
export type SuggestionLabels = ReadonlyMap<string, string>

/** Extracts the labels carried by any items passed to `[selected]`. */
export const labelEntries = (
  values: SuggestionSelectedInput,
): Array<[string, string]> =>
  sanitizeValues(values)
    .filter(isSuggestionItem)
    .map((item) => [item.value, item.label])

/** Normalizes anything accepted by `[selected]` into the primitive value model. */
export const toValue = (values: SuggestionSelectedInput): SuggestionValue => {
  if (values == null) return undefined

  const primitives = sanitizeValues(values).map((value) =>
    isSuggestionItem(value) ? value.value : value,
  )

  return Array.isArray(values) ? primitives : primitives[0]
}

export const resolveItems = (
  value: SuggestionValue,
  labels: SuggestionLabels,
): SuggestionItem[] =>
  toValues(value).map((optionValue) => ({
    label: labels.get(optionValue) ?? optionValue,
    value: optionValue,
  }))

/** Resolves a primitive value into items, using known labels where available. */
export const toSelected = (
  value: SuggestionValue,
  labels: SuggestionLabels,
): SuggestionSelected => {
  if (value == null) return undefined

  const items = resolveItems(value, labels)
  return Array.isArray(value) ? items : items[0]
}

export const sameValue = (left: SuggestionValue, right: SuggestionValue) => {
  if (Array.isArray(left) && Array.isArray(right)) {
    return (
      left.length === right.length &&
      left.every((value, index) => value === right[index])
    )
  }

  return left === right
}

export const nextSelected = (
  data: HTMLDataElement,
  previous: SuggestionValue,
  multiple: boolean,
): SuggestionValue => {
  const value = data.value

  if (!multiple) return data.isConnected ? undefined : value

  const previousValues = toValues(previous)

  return data.isConnected
    ? previousValues.filter((previousValue) => previousValue !== value)
    : [...previousValues, value]
}
