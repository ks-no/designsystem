import { Input } from '@ks-digital/designsystem-angular/forms'
import { render } from '@testing-library/angular'
import { vi } from 'vitest'
import { Suggestion } from './suggestion'
import type { SuggestionItem } from './suggestion.types'

type RenderSuggestionProps = {
  creatable?: boolean
  multiple?: boolean
  onSelectedChange?: (value: SuggestionItem | SuggestionItem[] | null) => void
  selected?: SuggestionItem | SuggestionItem[] | null
}

const renderSuggestion = async ({
  creatable = false,
  multiple = false,
  onSelectedChange = vi.fn(),
  selected = null,
}: RenderSuggestionProps = {}) =>
  render(
    `
			<ksd-suggestion
				[creatable]="creatable"
				[multiple]="multiple"
				[selected]="selected"
				(selectedChange)="onSelectedChange($event)"
			>
				<input ksd-input />
			</ksd-suggestion>
		`,
    {
      imports: [Suggestion, Input],
      componentProperties: {
        creatable,
        multiple,
        onSelectedChange,
        selected,
      },
    },
  )

describe('Suggestion', () => {
  it('should render selected item as data element', async () => {
    const selected: SuggestionItem = {
      label: 'Option 1',
      value: 'option-1',
    }

    const { container } = await renderSuggestion({ selected })
    const rendered = container.querySelector('data[value="option-1"]')

    expect(rendered).toBeInTheDocument()
    expect(rendered).toHaveTextContent('Option 1')
  })

  it('should set multiple and creatable attributes on ds-suggestion', async () => {
    const { container } = await renderSuggestion({
      creatable: true,
      multiple: true,
    })

    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toHaveAttribute('data-multiple')
    expect(dsSuggestion).toHaveAttribute('data-creatable')
  })

  it('should prevent default and emit selectedChange on comboboxbeforeselect', async () => {
    const onSelectedChange = vi.fn()
    const { container } = await renderSuggestion({ onSelectedChange })
    const dsSuggestion = container.querySelector('ds-suggestion')

    const data = document.createElement('data')
    data.value = 'option-1'
    data.textContent = 'Option 1'

    const event = new CustomEvent('comboboxbeforeselect', {
      bubbles: true,
      cancelable: true,
      detail: data,
    })

    dsSuggestion?.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    expect(onSelectedChange).toHaveBeenCalledWith({
      label: 'Option 1',
      value: 'option-1',
    })
  })

  it('should remove selected item in multiple mode when detail element is connected', async () => {
    const onSelectedChange = vi.fn()
    const selected: SuggestionItem[] = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ]

    const { container } = await renderSuggestion({
      multiple: true,
      onSelectedChange,
      selected,
    })
    const dsSuggestion = container.querySelector('ds-suggestion')

    const connectedData = document.createElement('data')
    connectedData.value = 'option-1'
    connectedData.textContent = 'Option 1'
    document.body.appendChild(connectedData)

    const event = new CustomEvent('comboboxbeforeselect', {
      bubbles: true,
      cancelable: true,
      detail: connectedData,
    })

    dsSuggestion?.dispatchEvent(event)
    connectedData.remove()

    expect(onSelectedChange).toHaveBeenCalledWith([
      {
        label: 'Option 2',
        value: 'option-2',
      },
    ])
  })
})
