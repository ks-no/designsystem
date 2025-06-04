import { Component } from '@angular/core'

@Component({
  selector: 'ksd-paragraph',
  template: `<ng-content />`,
  host: {
    class: 'ds-paragraph',
  },
})
export class Paragraph {}
