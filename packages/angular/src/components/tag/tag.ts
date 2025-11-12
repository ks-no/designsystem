import { Component, input } from '@angular/core'
import { CommonInputs } from '../common-inputs'

type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
type SeverityColors = 'success' | 'warning' | 'danger' | 'info'

@Component({
  selector: 'ksd-tag',
  template: ` <ng-content />`,
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    class: 'ds-tag',
  },
})
export class Tag {
  readonly dataColor = input<Color | SeverityColors | undefined>(undefined)
}
