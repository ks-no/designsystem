import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Field,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Label, Select } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Kommune</label>
  <select class="ds-input">
    <option value="">Velg kommune</option>
    <option value="4601">Bergen</option>
    <option value="0301">Oslo</option>
    <option value="1103">Stavanger</option>
    <option value="5001">Trondheim</option>
  </select>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Kommune</ksd-label>
  <select ksd-input>
    <option value="">Velg kommune</option>
    <option value="4601">Bergen</option>
    <option value="0301">Oslo</option>
    <option value="1103">Stavanger</option>
    <option value="5001">Trondheim</option>
  </select>
</ksd-field>`,
  react: `<Field>
  <Label>Kommune</Label>
  <Select>
    <Select.Option value="">Velg kommune</Select.Option>
    <Select.Option value="4601">Bergen</Select.Option>
    <Select.Option value="0301">Oslo</Select.Option>
    <Select.Option value="1103">Stavanger</Select.Option>
    <Select.Option value="5001">Trondheim</Select.Option>
  </Select>
</Field>`,
}

export const groups: Snippets = {
  html: `<ds-field class="ds-field">
  <label class="ds-label">Kommune</label>
  <select class="ds-input">
    <option value="">Velg kommune</option>
    <optgroup label="Rogaland">
      <option value="1103">Stavanger</option>
      <option value="1108">Sandnes</option>
    </optgroup>
    <optgroup label="Vestland">
      <option value="4601">Bergen</option>
      <option value="4621">Voss</option>
    </optgroup>
  </select>
</ds-field>`,
  angular: `<ksd-field>
  <ksd-label>Kommune</ksd-label>
  <select ksd-input>
    <option value="">Velg kommune</option>
    <optgroup label="Rogaland">
      <option value="1103">Stavanger</option>
      <option value="1108">Sandnes</option>
    </optgroup>
    <optgroup label="Vestland">
      <option value="4601">Bergen</option>
      <option value="4621">Voss</option>
    </optgroup>
  </select>
</ksd-field>`,
  react: `<Field>
  <Label>Kommune</Label>
  <Select>
    <Select.Option value="">Velg kommune</Select.Option>
    <Select.Optgroup label="Rogaland">
      <Select.Option value="1103">Stavanger</Select.Option>
      <Select.Option value="1108">Sandnes</Select.Option>
    </Select.Optgroup>
    <Select.Optgroup label="Vestland">
      <Select.Option value="4601">Bergen</Select.Option>
      <Select.Option value="4621">Voss</Select.Option>
    </Select.Optgroup>
  </Select>
</Field>`,
}
