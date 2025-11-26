import { Component } from '@angular/core'

@Component({
  selector: '[ksd-card-block]',
  host: {
    class: 'ds-card__block',
  },
  template: `<ng-content />`,
})
export class CardBlock {}
