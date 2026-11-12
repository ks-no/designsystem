import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import {
  Suggestion,
  SuggestionList,
  SuggestionListEmpty,
  SuggestionListOption,
} from '@ks-digital/designsystem-angular/suggestion'`,
  react: `import {
  EXPERIMENTAL_Suggestion as Suggestion,
  Field,
  Label,
} from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Velg kommune</label>
  <ds-suggestion class="ds-suggestion">
    <input class="ds-input" />
    <button type="reset"></button>
    <u-datalist>
      <u-option value="4601">Bergen</u-option>
      <u-option value="4204">Kristiansand</u-option>
      <u-option value="0301">Oslo</u-option>
      <u-option value="1103">Stavanger</u-option>
      <u-option value="5001">Trondheim</u-option>
      <u-option data-empty>Ingen treff</u-option>
    </u-datalist>
  </ds-suggestion>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Velg kommune</ksd-label>
  <ksd-suggestion>
    <input ksd-input />
    <button type="reset"></button>
    <ksd-suggestion-list>
      <ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="4204">
        Kristiansand
      </ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="0301">Oslo</ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="1103">Stavanger</ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="5001">Trondheim</ksd-suggestion-list-option>
      <ksd-suggestion-list-empty>Ingen treff</ksd-suggestion-list-empty>
    </ksd-suggestion-list>
  </ksd-suggestion>
</ksd-field>`,
  react: `<Field>
  <Label>Velg kommune</Label>
  <Suggestion>
    <Suggestion.Input />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Option value="4601">Bergen</Suggestion.Option>
      <Suggestion.Option value="4204">Kristiansand</Suggestion.Option>
      <Suggestion.Option value="0301">Oslo</Suggestion.Option>
      <Suggestion.Option value="1103">Stavanger</Suggestion.Option>
      <Suggestion.Option value="5001">Trondheim</Suggestion.Option>
      <Suggestion.Empty>Ingen treff</Suggestion.Empty>
    </Suggestion.List>
  </Suggestion>
</Field>`,
}

export const inForm: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Velg kommune</label>
  <ds-suggestion class="ds-suggestion">
    <data value="0301">Oslo</data>
    <input class="ds-input" />
    <button type="reset"></button>
    <u-datalist>
      <u-option value="4601">Bergen</u-option>
      <u-option value="4204">Kristiansand</u-option>
      <u-option value="0301">Oslo</u-option>
      <u-option value="1103">Stavanger</u-option>
      <u-option value="5001">Trondheim</u-option>
      <u-option data-empty>Ingen treff</u-option>
    </u-datalist>
    <select name="kommune" hidden></select>
  </ds-suggestion>
</ds-field>`,
  angular: `<!--
  I komponenten, med form og FormField fra '@angular/forms/signals':
  skjema = form(signal({ kommune: '0301' }))
-->
<ksd-field>
  <ksd-label>Velg kommune</ksd-label>
  <ksd-suggestion [formField]="skjema.kommune">
    <input ksd-input />
    <button type="reset"></button>
    <ksd-suggestion-list>
      <ksd-suggestion-list-option value="4601">Bergen</ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="4204">
        Kristiansand
      </ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="0301">Oslo</ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="1103">Stavanger</ksd-suggestion-list-option>
      <ksd-suggestion-list-option value="5001">Trondheim</ksd-suggestion-list-option>
      <ksd-suggestion-list-empty>Ingen treff</ksd-suggestion-list-empty>
    </ksd-suggestion-list>
  </ksd-suggestion>
</ksd-field>`,
  react: `<Field>
  <Label>Velg kommune</Label>
  <Suggestion name="kommune" defaultSelected={{ label: 'Oslo', value: '0301' }}>
    <Suggestion.Input />
    <Suggestion.Clear />
    <Suggestion.List>
      <Suggestion.Option value="4601">Bergen</Suggestion.Option>
      <Suggestion.Option value="4204">Kristiansand</Suggestion.Option>
      <Suggestion.Option value="0301">Oslo</Suggestion.Option>
      <Suggestion.Option value="1103">Stavanger</Suggestion.Option>
      <Suggestion.Option value="5001">Trondheim</Suggestion.Option>
      <Suggestion.Empty>Ingen treff</Suggestion.Empty>
    </Suggestion.List>
  </Suggestion>
</Field>`,
}
