import { Component, computed, inject, input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { iconRegistry } from './iconmap'

@Component({
  selector: 'ksd-icon',
  styles: `
    :host {
      display: contents;
    }
  `,
  template: ` <span [outerHTML]="trustedSVG()"></span> `,
})
export class Icon {
  sanitizer = inject(DomSanitizer)
  icon = input('home')

  protected svgIcon = computed(() => iconRegistry[this.icon()])
  protected trustedSVG = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.svgIcon()),
  )
}
