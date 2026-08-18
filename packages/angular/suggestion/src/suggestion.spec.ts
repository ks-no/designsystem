import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormField, form } from '@angular/forms/signals'
import { By } from '@angular/platform-browser'
import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { render, waitFor } from '@testing-library/angular'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import {
  SuggestionList,
  SuggestionListEmpty,
  SuggestionListOption,
} from './index'
import { Suggestion } from './suggestion'
import type {
  SuggestionFilter,
  SuggestionItem,
  SuggestionSelected,
  SuggestionSelectedInput,
} from './suggestion.types'

type RenderSuggestionProps = {
  creatable?: boolean
  filter?: boolean | SuggestionFilter
  multiple?: boolean
  onSelectedChange?: (value: SuggestionSelected) => void
  onTouch?: () => void
  selected?: SuggestionSelectedInput
}

const renderSuggestion = async ({
  creatable = false,
  filter = true,
  multiple = false,
  onSelectedChange = vi.fn(),
  onTouch = vi.fn(),
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
        (touchedChange)="onTouch()"
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
        onTouch,
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Suggestion, SuggestionList, SuggestionListOption, Input, FormField],
  template: `
    <ksd-suggestion [formField]="municipalityForm.municipality">
      <input ksd-input />
      <ksd-suggestion-list>
        <ksd-suggestion-list-option value="4601"
          >Bergen</ksd-suggestion-list-option
        >
        <ksd-suggestion-list-option value="0301"
          >Oslo</ksd-suggestion-list-option
        >
      </ksd-suggestion-list>
    </ksd-suggestion>
  `,
})
class SuggestionFormFieldHost {
  readonly municipalityModel = signal<{
    municipality: string
  }>({
    municipality: '0301',
  })

  readonly municipalityForm = form(this.municipalityModel)
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Suggestion, SuggestionList, SuggestionListOption, Input, FormField],
  template: `
    <ksd-suggestion multiple [formField]="municipalityForm.municipalities">
      <input ksd-input />
      <ksd-suggestion-list>
        <ksd-suggestion-list-option value="4601"
          >Bergen</ksd-suggestion-list-option
        >
        <ksd-suggestion-list-option value="0301"
          >Oslo</ksd-suggestion-list-option
        >
      </ksd-suggestion-list>
    </ksd-suggestion>
  `,
})
class SuggestionMultipleFormFieldHost {
  readonly municipalityModel = signal<{
    municipalities: string[]
  }>({
    municipalities: [],
  })

  readonly municipalityForm = form(this.municipalityModel)
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Suggestion, Input],
  template: `
    <ksd-suggestion [multiple]="true" [selected]="selected()">
      <input ksd-input />
    </ksd-suggestion>
  `,
})
class SuggestionMultipleSelectedHost {
  readonly selected = signal<SuggestionSelectedInput>(undefined)
}

describe('Suggestion', () => {
  it('should have no obvious accessibility violations', async () => {
    const { container } = await render(
      `
      <ksd-field>
        <ksd-label>Velg destinasjon</ksd-label>
          <ksd-suggestion>
            <input ksd-input />
            <ksd-suggestion-list>
              <ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
              <ksd-suggestion-list-option value="0301">Oslo</ksd-suggestion-list-option>
              <ksd-suggestion-list-option value="1103">Stavanger</ksd-suggestion-list-option>
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>
      `,
      {
        imports: [
          Suggestion,
          SuggestionList,
          SuggestionListOption,
          Input,
          Field,
          Label,
        ],
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

  it('should accept raw option values in selected and resolve their labels', async () => {
    const { container } = await renderSuggestionWithList({ selected: '0301' })

    await waitFor(() => {
      const rendered = container.querySelector('data[value="0301"]')

      expect(rendered).toBeInTheDocument()
      expect(rendered).toHaveTextContent('Oslo')
    })
  })

  it('should expose the current selection through the value model', async () => {
    const { container, fixture } = await renderSuggestionWithList()
    const suggestion = fixture.debugElement.query(By.directive(Suggestion))
      .componentInstance as Suggestion
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toBeInTheDocument()
    if (!dsSuggestion) return

    const data = document.createElement('data')
    data.value = '0301'
    data.textContent = 'Oslo'

    dsSuggestion.dispatchEvent(
      new CustomEvent('comboboxbeforeselect', {
        bubbles: true,
        cancelable: true,
        detail: data,
      }),
    )

    await waitFor(() => {
      expect(suggestion.value()).toBe('0301')
    })
  })

  it('should distinguish an empty array from undefined', async () => {
    const { fixture } = await render(SuggestionMultipleSelectedHost)
    const host = fixture.componentInstance

    host.selected.set([])
    fixture.detectChanges()

    const suggestion = fixture.debugElement.query(By.directive(Suggestion))
      .componentInstance as Suggestion

    expect(Array.isArray(suggestion.value())).toBe(true)
    expect(suggestion.value()).toEqual([])

    host.selected.set(undefined)
    fixture.detectChanges()

    expect(suggestion.value()).toBeUndefined()
  })

  it('should work as a formField host', async () => {
    const { container } = await render(SuggestionFormFieldHost)

    const rendered = container.querySelector('data[value="0301"]')

    expect(rendered).toBeInTheDocument()
    expect(rendered).toHaveTextContent('Oslo')
  })

  it('should write primitive string values through formField', async () => {
    const { container, fixture } = await render(SuggestionFormFieldHost)
    const host = fixture.componentInstance
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toBeInTheDocument()
    if (!dsSuggestion) return

    const data = document.createElement('data')
    data.value = '4601'
    data.textContent = 'Bergen'

    dsSuggestion.dispatchEvent(
      new CustomEvent('comboboxbeforeselect', {
        bubbles: true,
        cancelable: true,
        detail: data,
      }),
    )

    await waitFor(() => {
      expect(host.municipalityModel().municipality).toBe('4601')
    })
  })

  it('should write an array of primitive values through a multiple formField', async () => {
    const { container, fixture } = await render(SuggestionMultipleFormFieldHost)
    const host = fixture.componentInstance
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toBeInTheDocument()
    if (!dsSuggestion) return

    const data = document.createElement('data')
    data.value = '4601'
    data.textContent = 'Bergen'

    dsSuggestion.dispatchEvent(
      new CustomEvent('comboboxbeforeselect', {
        bubbles: true,
        cancelable: true,
        detail: data,
      }),
    )

    await waitFor(() => {
      expect(host.municipalityModel().municipalities).toEqual(['4601'])
    })
  })

  it('should mark the bound form field as touched on blur', async () => {
    const { container, fixture } = await render(SuggestionFormFieldHost)
    const host = fixture.componentInstance
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(host.municipalityForm.municipality().touched()).toBe(false)
    expect(dsSuggestion).toBeInTheDocument()
    if (!dsSuggestion) return

    dsSuggestion.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: document.body,
      }),
    )

    await waitFor(() => {
      expect(host.municipalityForm.municipality().touched()).toBe(true)
    })
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

  it('should not emit selectedChange when selecting the same item again', async () => {
    const onSelectedChange = vi.fn()
    const selected: SuggestionItem = {
      label: 'Option 1',
      value: 'option-1',
    }

    const { container } = await renderSuggestion({ onSelectedChange, selected })
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

    expect(onSelectedChange).not.toHaveBeenCalled()
  })

  it('should not restore stale selected input after an internal selection change', async () => {
    const onSelectedChange = vi.fn()
    const { container } = await renderSuggestionWithList({
      onSelectedChange,
      selected: {
        label: 'Bergen',
        value: '4601',
      },
    })
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toBeInTheDocument()
    if (!dsSuggestion) return

    const data = document.createElement('data')
    data.value = '0301'
    data.textContent = 'Oslo'

    dsSuggestion.dispatchEvent(
      new CustomEvent('comboboxbeforeselect', {
        bubbles: true,
        cancelable: true,
        detail: data,
      }),
    )

    await waitFor(() => {
      expect(onSelectedChange).toHaveBeenCalledWith({
        label: 'Oslo',
        value: '0301',
      })
      expect(container.querySelector('data[value="0301"]')).toHaveTextContent(
        'Oslo',
      )
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

  it('should not block Escape while the suggestion list is closed', async () => {
    const { container } = await renderSuggestionWithList()
    const input = container.querySelector('input')

    expect(input).toBeInTheDocument()
    if (!input) return

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    })

    input.dispatchEvent(event)

    // Escape must stay available to ancestors such as <dialog>.
    expect(event.defaultPrevented).toBe(false)
  })

  it('should not mark as touched when focus moves within the suggestion control', async () => {
    const onTouch = vi.fn()
    const { container } = await renderSuggestion({ onTouch })
    const dsSuggestion = container.querySelector('ds-suggestion')
    const datalist = container.querySelector('u-datalist')

    expect(dsSuggestion).toBeInTheDocument()
    expect(datalist).toBeInTheDocument()

    if (!dsSuggestion || !datalist) return

    dsSuggestion.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: datalist,
      }),
    )

    expect(onTouch).not.toHaveBeenCalled()
  })

  it('should mark as touched when focus leaves the suggestion control', async () => {
    const onTouch = vi.fn()
    const { container } = await renderSuggestion({ onTouch })
    const dsSuggestion = container.querySelector('ds-suggestion')

    expect(dsSuggestion).toBeInTheDocument()

    if (!dsSuggestion) return

    dsSuggestion.dispatchEvent(
      new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: document.body,
      }),
    )

    expect(onTouch).toHaveBeenCalledTimes(1)
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
        expect(bergenOption).not.toBeDisabled()
        expect(osloOption).not.toBeDisabled()
      })
    })

    it('should show empty option when projected options become empty', async () => {
      const showOptions = signal(true)

      const { container } = await render(
        `
        <ksd-suggestion [filter]="false">
          <input ksd-input />
          <ksd-suggestion-list>
            @if (showOptions()) {
              <ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
            }
            <ksd-suggestion-list-empty>Ingen treff</ksd-suggestion-list-empty>
          </ksd-suggestion-list>
        </ksd-suggestion>
      `,
        {
          imports: [
            Suggestion,
            SuggestionList,
            SuggestionListOption,
            SuggestionListEmpty,
            Input,
          ],
          componentProperties: {
            showOptions,
          },
        },
      )

      const bergenOption = container.querySelector('u-option[value="4601"]')
      const emptyOption = container.querySelector('u-option[data-empty]')

      expect(bergenOption).toBeInTheDocument()
      expect(emptyOption).toBeInTheDocument()

      if (!bergenOption || !emptyOption) return

      showOptions.set(false)

      await waitFor(() => {
        expect(emptyOption).not.toHaveAttribute('hidden')
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

  describe('u-datalist popover', () => {
    it('should render u-datalist as a direct child of ds-suggestion with popover="manual" and data-is-floating', async () => {
      const { container } = await renderSuggestionWithList()

      const dsSuggestion = container.querySelector('ds-suggestion')
      const datalist = dsSuggestion?.querySelector(':scope > u-datalist')

      expect(datalist).toBeInTheDocument()
      expect(datalist).toHaveAttribute('popover', 'manual')
      expect(datalist).toHaveAttribute('data-is-floating', 'true')
    })
  })
})
