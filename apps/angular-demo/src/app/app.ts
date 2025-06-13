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
        <ksd-label> I can be chosen </ksd-label>
        <input ksd-checkbox value="telefon"  />
      </ksd-field>

      <ksd-field>
        <ksd-label> I am invalid </ksd-label>
        <input ksd-checkbox value="SMS" aria-invalid="true" />
      </ksd-field>

      <ksd-field>
        <ksd-label> I am disabled </ksd-label>
        <input ksd-checkbox value="SMS" disabled />
      </ksd-field>

      <ksd-field>
        <ksd-label data-size="xl"> I am extra large </ksd-label>
        <input  ksd-checkbox value="xl"  />
      </ksd-field>

      <p ksd-validation-message data-size="xl">Du må velge minst to kontaktalternativ</p>
    </fieldset>
  `,
})
export class App { }
