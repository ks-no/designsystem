import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'p[ksd-paragraph]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'ds-paragraph',
  },
})
export class Paragraph {}
