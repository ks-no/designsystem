import { Component } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'a[ksd-link]',
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    class: 'ds-link',
  },
  styles: `
    /* Ensure that icons are aligned in middle */
    :host {
      ng-icon {
        vertical-align: middle;

        & :is(svg, img) {
          vertical-align: unset;
        }
      }

      > :is(svg, img) {
        width: 1.2em;
        height: 1.2em;
      }
    }
  `,
})
export class Link {}
