import { Component } from '@angular/core'
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Label,
} from '@ks-digital/designsystem-angular'
import { CheckboxDirective } from 'packages/angular/src/components/checkbox/checkbox-input.component'

import { Field } from '../../../../packages/angular/src/components/field/field'

@Component({
  imports: [
    // Checkbox,
    CheckboxDirective,
    Fieldset,
    FieldsetDescription,
    FieldsetLegend,
    Field,
    Label,
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
        <input ksdCheckbox value="SMS" />
        <label ksdLabel> SMS </label>
      </ksd-field>
    </fieldset>
  `,
})
export class App {}
