import { Component } from '@angular/core'
import {
  Checkbox,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from '@ks-digital/designsystem-angular'

@Component({
  imports: [Checkbox, Fieldset, FieldsetDescription, FieldsetLegend],
  selector: 'app-root',
  template: `
    <h1>Hi</h1>
    <fieldset ksdFieldset>
      <legend ksdFieldsetLegend> Hvordan vil du helst at vi skal kontakte deg?</legend >
      <p ksdFieldsetDescription> Velg alle alternativene som er relevante for deg.</p>
      <ksd-checkbox label="E-post" />
      <ksd-checkbox label="Telefon" />
      <ksd-checkbox label="SMS" />
    </fieldset>

  `,
  styles: ``,
})
export class AppComponent { }
