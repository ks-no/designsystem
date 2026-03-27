import { Input } from '@ks-digital/designsystem-angular/forms'
import { render, waitFor } from '@testing-library/angular'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import { SuggestionList, SuggestionListOption } from './index'
import { Suggestion } from './suggestion'
import type { SuggestionFilter, SuggestionItem } from './suggestion.types'

type RenderSuggestionProps = {
  creatable?: boolean
  filter?: boolean | SuggestionFilter
  multiple?: boolean
  onSelectedChange?: (value: SuggestionItem | SuggestionItem[] | null) => void
  selected?: SuggestionItem | SuggestionItem[] | null
}

const renderSuggestion = async ({
  creatable = false,
  filter = true,
  multiple = false,
  onSelectedChange = vi.fn(),
  selected = null,
}: RenderSuggestionProps = {}) =>
  render(
    `
			<ksd-suggestion
				[creatable]="creatable"
        [filter]="filter"
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
        filter,
        multiple,
        onSelectedChange,
        selected,
      },
    },
  )

const renderSuggestionWithList = async ({
  creatable = false,
  filter = true,
  multiple = false,
  onSelectedChange = vi.fn(),
  selected = null,
}: RenderSuggestionProps = {}) =>
  render(
    `
			<ksd-suggestion
				[creatable]="creatable"
				[filter]="filter"
				[multiple]="multiple"
				[selected]="selected"
				(selectedChange)="onSelectedChange($event)"
			>
				<input ksd-input />
				<ksd-suggestion-list>
					<ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
					<ksd-suggestion-list-option value="0301">Oslo</ksd-suggestion-list-option>
					<ksd-suggestion-list-option value="1103">Stavanger</ksd-suggestion-list-option>
				</ksd-suggestion-list>
			</ksd-suggestion>
		`,
    {
      imports: [Suggestion, SuggestionList, SuggestionListOption, Input],
      componentProperties: {
        creatable,
        filter,
        multiple,
        onSelectedChange,
        selected,
      },
    },
  )

describe('Suggestion', () => {
  it('should have no obvious accessibility violations', async () => {
    const { container } = await render(
      `
        <ksd-suggestion>
          <input ksd-input />
          <ksd-suggestion-list>
            <ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
            <ksd-suggestion-list-option value="0301">Oslo</ksd-suggestion-list-option>
            <ksd-suggestion-list-option value="1103">Stavanger</ksd-suggestion-list-option>
          </ksd-suggestion-list>
        </ksd-suggestion>
      `,
      {
        imports: [Suggestion, SuggestionList, SuggestionListOption, Input],
      },
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

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

  it('should prevent default on Escape key', async () => {
    const { container } = await renderSuggestion()
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toBeInTheDocument()
    if (!dsSuggestion) return

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    })

    dsSuggestion.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  describe('Filtering', () => {
    it('should set data-nofilter on u-datalist', async () => {
      const { container } = await renderSuggestionWithList({ filter: false })

      expect(container.querySelector('u-datalist')).toHaveAttribute(
        'data-nofilter',
      )
    })

    it('should not use built-in filtering when filter is disabled', async () => {
      const { container } = await renderSuggestionWithList({ filter: false })

      const input = container.querySelector('input')
      const bergenOption = container.querySelector('u-option[value="4601"]')
      const osloOption = container.querySelector('u-option[value="0301"]')

      expect(input).toBeInTheDocument()
      expect(bergenOption).toBeInTheDocument()
      expect(osloOption).toBeInTheDocument()

      if (!input || !bergenOption || !osloOption) return

      input.value = 'Bx'
      input.dispatchEvent(new Event('input', { bubbles: true }))

      await waitFor(() => {
        expect(bergenOption).toHaveAttribute('aria-hidden', 'false')
        expect(osloOption).toHaveAttribute('aria-hidden', 'false')
      })
    })

    it('should keep options visible when filtering is disabled', async () => {
      const { container } = await render(
        `
        <ksd-suggestion [filter]="false">
          <input ksd-input />
          <ksd-suggestion-list>
            <ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
          </ksd-suggestion-list>
        </ksd-suggestion>
      `,
        {
          imports: [Suggestion, SuggestionList, SuggestionListOption, Input],
        },
      )

      const input = container.querySelector('input')
      const bergenOption = container.querySelector('u-option[value="4601"]')

      expect(input).toBeInTheDocument()
      expect(bergenOption).toBeInTheDocument()

      if (!input || !bergenOption) return

      input.value = 'Bx'
      input.dispatchEvent(new Event('input', { bubbles: true }))

      await waitFor(() => {
        expect(bergenOption).toHaveAttribute('aria-hidden', 'false')
      })
    })

    it('should apply custom filter callback to the rendered options', async () => {
      const customFilter: SuggestionFilter = ({ label }) => label === 'Bergen'
      const { container } = await renderSuggestionWithList({
        filter: customFilter,
      })

      const bergenOption = container.querySelector<HTMLOptionElement>(
        'u-option[value="4601"]',
      )
      const osloOption = container.querySelector<HTMLOptionElement>(
        'u-option[value="0301"]',
      )
      const stavangerOption = container.querySelector<HTMLOptionElement>(
        'u-option[value="1103"]',
      )

      expect(bergenOption).toBeInTheDocument()
      expect(osloOption).toBeInTheDocument()
      expect(stavangerOption).toBeInTheDocument()

      if (!bergenOption || !osloOption || !stavangerOption) return

      await waitFor(() => {
        expect(bergenOption.disabled).toBe(false)
        expect(osloOption.disabled).toBe(true)
        expect(stavangerOption.disabled).toBe(true)
      })
    })
  })
})
