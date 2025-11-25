import { Component } from '@angular/core'

@Component({
  selector: 'p[ksd-paragraph]',
  template: `<ng-content />`,
  host: {
    class: 'ds-paragraph',
  },
})
export class Paragraph {}
