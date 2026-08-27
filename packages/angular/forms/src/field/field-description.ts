import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: '[ksd-field-description]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-field': 'description',
  },
  template: `<ng-content />`,
})
export class FieldDescription {}
