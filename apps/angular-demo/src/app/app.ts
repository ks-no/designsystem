import { Component } from '@angular/core'
import {
  Checkbox,
  Field,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Label,
  ValidationMessage,
} from '@ks-digital/designsystem-angular'

@Component({
  imports: [
    Checkbox,
    Field,
    Fieldset,
    FieldsetDescription,
    FieldsetLegend,
    Label,
    ValidationMessage,
  ],
  selector: 'app-root',
  template: `
    <h1>Hi</h1>
    <fieldset ksd-fieldset>
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <input ksd-checkbox value="telefon" />
        <label ksd-label> I can be chosen </label>
      </ksd-field>

      <ksd-field>
        <input ksd-checkbox value="SMS" aria-invalid="true" />
        <label ksd-label> I am invalid </label>
      </ksd-field>

      <ksd-field>
        <input ksd-checkbox value="SMS" disabled />
        <label ksd-label> I am disabled </label>
      </ksd-field>

      <p ksd-validation-message>Du må velge minst to kontaktalternativ</p>
    </fieldset>
  `,
})
export class App {}
