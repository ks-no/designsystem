import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'p[ksdFieldsetDescription]',
  template: `<ng-content />`,
  host: {}
})
export class FieldsetDescription {
}
