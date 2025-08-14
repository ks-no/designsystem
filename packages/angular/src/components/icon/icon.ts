import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// Import icons using unplugin-icons - these are compiled at build time
// import locationHomeIcon from '@iconify/icons-material-symbols/location-home'

import '~icons/material-symbols/add-alert'

/**
 * Renders a rounded Material Icon with weight 300
 */
@Component({
  selector: 'ksd-icon',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    :host {
      display: contents;
    }

    :host > * {
      display: inline-flex;
    }

    // ::ng-deep svg {
    //   font-size: 100px;
    // }
  `,
  template: `
    <icon-material-symbols-add-alert />
    <!-- <ng-content /> -->
  `,
})
export class Icon {}
