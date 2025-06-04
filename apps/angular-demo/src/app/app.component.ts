import { Component } from '@angular/core'
import { Checkbox } from '@ks-digital/designsystem-angular'

@Component({
  imports: [Checkbox],
  selector: 'app-root',
  template: `
    <h1>Hi</h1>

    <ksd-checkbox label="Hi u!" />
  `,
  styles: ``,
})
export class AppComponent {
}
