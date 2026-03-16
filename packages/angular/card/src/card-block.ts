import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: '[ksd-card-block]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-card__block',
  },
  template: `<ng-content />`,
})
export class CardBlock {}
