import { Component, computed, inject, input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { iconRegistry } from './iconmap'

@Component({
  selector: 'ksd-icon',
  styles: `
    :host {
      display: contents;
    }
    :host svg {
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
      fill: currentColor;
    }
  `,
  template: `
    <span [style.--icon-size]="size()" [outerHTML]="trustedSVG()"></span>
  `,
})
export class Icon {
  sanitizer = inject(DomSanitizer)
  icon = input('home')
  size = input<string>('3em')

  protected svgIcon = computed(() => iconRegistry[this.icon()])
  protected trustedSVG = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.svgIcon()),
  )

  constructor() {
    console.log(this.size())
  }
}
