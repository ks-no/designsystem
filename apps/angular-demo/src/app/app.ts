import { Component } from '@angular/core'
import {
  Field,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'

@Component({
  imports: [
    Input,
    Field,
    Fieldset,
    FieldsetDescription,
    FieldsetLegend,
    Label,
    ValidationMessage,
  ],
  selector: 'app-root',
  template: `
    <h1>Hi from Angular</h1>
    <fieldset ksd-fieldset style="width: 400px;">
      <legend ksd-fieldset-legend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksd-fieldset-description>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <ksd-label> I can be chosen </ksd-label>
        <input ksd-input type="checkbox" value="telefon" />
      </ksd-field>

      <ksd-field>
        <ksd-label> I am invalid </ksd-label>
        <input ksd-input type="checkbox" value="SMS" aria-invalid="true" />
      </ksd-field>

      <ksd-field>
        <ksd-label> I am disabled </ksd-label>
        <input ksd-input type="checkbox" value="SMS" disabled />
      </ksd-field>

      <ksd-field data-size="lg">
        <ksd-label> I am large </ksd-label>
        <input ksd-input type="checkbox" value="lg" />
      </ksd-field>

      <ksd-field data-position="end">
        <ksd-label> Checkbox positioned at the end</ksd-label>
        <input ksd-input type="checkbox" value="lg" />
      </ksd-field>

      <p ksd-validation-message>Du må velge minst to kontaktalternativ</p>
    </fieldset>
  `,
})
export class App {}
