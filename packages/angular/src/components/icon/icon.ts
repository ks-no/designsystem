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
  icon = input.required()

  protected svgIcon = computed(() => {
    const iconName = this.icon() as keyof typeof iconRegistry
    return iconRegistry[iconName] || ''
  })

  protected trustedSVG = computed(() => {
    const svg = this.svgIcon()
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : ''
  })
}
