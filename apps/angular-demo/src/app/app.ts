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
    <fieldset ksdFieldset>
      <legend ksdFieldsetLegend>
        Hvordan vil du helst at vi skal kontakte deg?
      </legend>
      <p ksdFieldsetDescription>
        Velg alle alternativene som er relevante for deg.
      </p>

      <ksd-field>
        <input ksdCheckbox value="telefon" />
        <label ksdLabel> Telefon </label>
      </ksd-field>

      <ksd-field>
        <input ksdCheckbox value="SMS" aria-invalid="true" />
        <label ksdLabel> SMS </label>
      </ksd-field>

      <p ksdValidationMessage>Du må velge minst to kontaktalternativ</p>
    </fieldset>
  `,
})
export class App {}
