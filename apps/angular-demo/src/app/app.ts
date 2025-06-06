import { Component } from '@angular/core'
import {
  Field,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Label,
  ValidationMessage,
} from '@ks-digital/designsystem-angular'
import { CheckboxDirective } from 'packages/angular/src/components/checkbox/checkbox-input.component'

@Component({
  imports: [
    // Checkbox,
    CheckboxDirective,
    Fieldset,
    FieldsetDescription,
    FieldsetLegend,
    Field,
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
        <label ksd-label> Telefon </label>
      </ksd-field>

      <ksd-field>
        <input ksd-checkbox value="SMS" aria-invalid="true" />
        <label ksd-label> SMS </label>
      </ksd-field>

      <p ksd-validation-message>Du må velge minst to kontaktalternativ</p>
    </fieldset>
  `,
})
export class App {}
