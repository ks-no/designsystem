import { Component } from '@angular/core'
import { FiksCheckboxInputComponent } from '@ks-digital/designsystem-angular'

@Component({
  imports: [FiksCheckboxInputComponent],
  selector: 'app-root',
  template: `
    <h1>Hi</h1>

    <fiks-checkbox-input> Check meg ut </fiks-checkbox-input>
  `,
  styles: ``,
})
export class AppComponent {
  title = 'angular-demo'
}
