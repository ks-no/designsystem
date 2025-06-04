import {
  Component
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'fieldset[ksdFieldset]',
  host: {
    role: 'fieldset',
    class: 'ds-fieldset',
  },
  template: ` <ng-content /> `,

})
export class Fieldset { }
