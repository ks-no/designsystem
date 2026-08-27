import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ksd-details-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class DetailsContent {}
