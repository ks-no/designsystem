import { DestroyRef, Directive, ElementRef, inject } from '@angular/core'

@Directive({
  selector: '[ksdPaginationButton]',
  host: {
    class: 'ds-button',
  },
})
export class PaginationButton {
  private el = inject<ElementRef<HTMLElement>>(ElementRef)
  private destroyRef = inject(DestroyRef)

  constructor() {
    const observer = new MutationObserver(() => this.updateVariant())
    observer.observe(this.el.nativeElement, {
      attributes: true,
      attributeFilter: ['aria-current'],
    })
    this.updateVariant()

    this.destroyRef.onDestroy(() => observer.disconnect())
  }

  private updateVariant() {
    const isCurrent =
      this.el.nativeElement.getAttribute('aria-current') === 'true'
    this.el.nativeElement.setAttribute(
      'data-variant',
      isCurrent ? 'primary' : 'tertiary',
    )
  }
}
