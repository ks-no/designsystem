import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'p[ksd-fieldset-description]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {},
})
export class FieldsetDescription {}
