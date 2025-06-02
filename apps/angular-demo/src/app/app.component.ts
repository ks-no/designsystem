import { Component } from '@angular/core'
import { AngularComponent } from '@ks-digital/designsystem-angular'

@Component({
  imports: [AngularComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-demo'
}
